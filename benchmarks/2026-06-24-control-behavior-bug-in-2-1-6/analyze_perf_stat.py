#!/usr/bin/env python3
"""Analyze paired perf-stat + benchmark output from benchmark_perf_stat.sh.

For each (version, idx):
  - parse results_perf_stat/<version>/<idx>.perf into {event: float}
  - read results_perf_stat/<version>/<idx>/loop_*_verbose_metrics.csv and
    compute the mean controlBehaviorUpdate over ticks > 0 (drops warmup)

Classifies each process as fast or slow using the version's own (min x 1.30)
threshold (same threshold the N-sweep analysis used). Prints per-counter
fast vs slow means and a cross-version compare (2.0.77 unimodal baseline vs
2.1.6 fast vs 2.1.6 slow). Counters where 2.1.6 slow diverges from both the
2.0.77 baseline and 2.1.6 fast are the suspects.

Usage:  ./analyze_perf_stat.py    (run from benchmark_003 directory)
"""
import csv
import glob
import os
import re
import statistics

ROOT = "results_perf_stat"
THRESH_MULT = 1.30


def parse_perf_file(path):
    counters = {}
    try:
        with open(path) as f:
            for raw in f:
                line = raw.strip()
                if not line or line.startswith("#") or line.startswith("Performance"):
                    continue
                m = re.match(r'^([\d,\.]+|<not\s+counted>|<not\s+supported>)\s+(?:msec\s+)?(\S+)', line)
                if not m:
                    continue
                val_s, event = m.group(1), m.group(2)
                if "<" in val_s:
                    continue
                try:
                    counters[event] = float(val_s.replace(",", ""))
                except ValueError:
                    pass
    except FileNotFoundError:
        return None
    return counters


def parse_cb_update(version_dir, idx):
    matches = glob.glob(f"{version_dir}/{idx}/loop_*_verbose_metrics.csv")
    if not matches:
        return None
    vals = []
    with open(matches[0]) as f:
        for row in csv.DictReader(f):
            try:
                tick = int(row["tick"])
            except (KeyError, ValueError):
                continue
            if tick == 0:
                continue  # warmup spike
            try:
                vals.append(float(row["controlBehaviorUpdate"]))
            except (KeyError, ValueError):
                continue
    return statistics.mean(vals) if vals else None


def collect(version):
    vdir = f"{ROOT}/{version}"
    if not os.path.isdir(vdir):
        return []
    runs = []
    for entry in sorted(os.listdir(vdir)):
        if not entry.endswith(".perf"):
            continue
        idx = entry[:-5]
        c = parse_perf_file(f"{vdir}/{entry}")
        cb = parse_cb_update(vdir, idx)
        if c is not None and cb is not None:
            runs.append((idx, cb, c))
    return runs


def fmt(v):
    if v >= 1e9:
        return f"{v/1e9:>10.3f} G"
    if v >= 1e6:
        return f"{v/1e6:>10.3f} M"
    if v >= 1e3:
        return f"{v/1e3:>10.3f} K"
    return f"{v:>12.2f}  "


def analyze_version(version, runs):
    print(f"\n=== {version} (n={len(runs)}) ===")
    if not runs:
        return
    cb_vals = sorted(cb for _, cb, _ in runs)
    mn, mx = cb_vals[0], cb_vals[-1]
    med = statistics.median(cb_vals)
    sd = statistics.stdev(cb_vals) if len(cb_vals) > 1 else 0
    print(f"  cb: min={mn:.0f} med={med:.0f} max={mx:.0f} stdev={sd:.0f} range={(mx-mn)/mn*100:.1f}%")

    thresh = mn * THRESH_MULT
    fast = [(i, cb, c) for i, cb, c in runs if cb < thresh]
    slow = [(i, cb, c) for i, cb, c in runs if cb >= thresh]
    print(f"  threshold ({THRESH_MULT}x min = {thresh:.0f}): fast n={len(fast)} slow n={len(slow)}")
    if fast:
        print(f"  fast cb mean: {statistics.mean([cb for _, cb, _ in fast]):.0f}")
    if slow:
        print(f"  slow cb mean: {statistics.mean([cb for _, cb, _ in slow]):.0f}")
    if fast and slow:
        ratio = statistics.mean([cb for _, cb, _ in slow]) / statistics.mean([cb for _, cb, _ in fast])
        print(f"  slow/fast cb: {ratio:.3f}x")
    if not (fast and slow):
        print("  not bimodal - skip counter delta")
        return

    events = sorted({ev for _, _, c in runs for ev in c})
    print(f"\n  {'event':<32} {'fast mean':>15} {'slow mean':>15} {'slow/fast':>10}  {'fast cv%':>9} {'slow cv%':>9}")
    print(f"  {'-'*32} {'-'*15} {'-'*15} {'-'*10}  {'-'*9} {'-'*9}")
    for ev in events:
        fv = [c[ev] for _, _, c in fast if ev in c]
        sv = [c[ev] for _, _, c in slow if ev in c]
        if not (fv and sv):
            continue
        fm, sm = statistics.mean(fv), statistics.mean(sv)
        fcv = (statistics.stdev(fv) / fm * 100) if (len(fv) > 1 and fm) else 0
        scv = (statistics.stdev(sv) / sm * 100) if (len(sv) > 1 and sm) else 0
        r = sm / fm if fm else 0
        mark = "  *" if (r >= 1.30 or r <= 0.77) else ""
        print(f"  {ev:<32} {fmt(fm)} {fmt(sm)} {r:>9.3f}x  {fcv:>8.2f}% {scv:>8.2f}%{mark}")


def cross_version(by_version):
    v0 = by_version.get("2_0_77", [])
    v1 = by_version.get("2_1_6", [])
    if not (v0 and v1):
        return
    cb1 = sorted(cb for _, cb, _ in v1)
    thresh1 = cb1[0] * THRESH_MULT
    v1f = [(i, cb, c) for i, cb, c in v1 if cb < thresh1]
    v1s = [(i, cb, c) for i, cb, c in v1 if cb >= thresh1]
    if not (v1f and v1s):
        return

    events = sorted({ev for _, _, c in v0 + v1 for ev in c})
    print(f"\n=== Cross-version: 2_0_77 (n={len(v0)}) vs 2_1_6 fast (n={len(v1f)}) vs 2_1_6 slow (n={len(v1s)}) ===")
    print(f"  Counters where 2.1.6 slow diverges from BOTH 2.0.77 and 2.1.6 fast are the suspects.")
    print(f"\n  {'event':<32} {'2_0_77':>15} {'2_1_6 fast':>15} {'2_1_6 slow':>15} {'slow/v0':>9}")
    print(f"  {'-'*32} {'-'*15} {'-'*15} {'-'*15} {'-'*9}")
    for ev in events:
        v0v = [c[ev] for _, _, c in v0 if ev in c]
        fv = [c[ev] for _, _, c in v1f if ev in c]
        sv = [c[ev] for _, _, c in v1s if ev in c]
        if not (v0v and fv and sv):
            continue
        v0m, fm, sm = statistics.mean(v0v), statistics.mean(fv), statistics.mean(sv)
        r = sm / v0m if v0m else 0
        mark = "  *" if (r >= 1.30 or r <= 0.77) else ""
        print(f"  {ev:<32} {fmt(v0m)} {fmt(fm)} {fmt(sm)} {r:>8.3f}x{mark}")


def main():
    by = {v: collect(v) for v in ("2_0_77", "2_1_6")}
    for v, runs in by.items():
        analyze_version(v, runs)
    cross_version(by)


if __name__ == "__main__":
    main()
