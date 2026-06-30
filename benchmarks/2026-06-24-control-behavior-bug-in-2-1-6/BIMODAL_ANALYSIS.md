# Control Behavior Update Bimodal Distribution Analysis

## Summary

Analysis of **1,400 benchmarks** (50 runs × 14 configurations × 2 versions) comparing Factorio 2.0.77 and 2.1.6 control behavior performance on identical inserter-loop save files. Each loop copy contains 16 inserters wired into a circuit network (unless suffixed `no_circuit`), so the number of active control behaviors scales linearly with the `loop_N` value.

## Findings

### 1. Fast-mode 2.1.6 is identical to 2.0.77

| Config | 2.0.77 min (µs) | 2.1.6 min (µs) | Delta |
|--------|----------------:|---------------:|------:|
| loop_128_circuit_no_condition  | 15,690 | 15,508 | -1.2% |
| loop_512_circuit_no_condition  | 27,975 | 27,576 | -1.4% |
| loop_1024_circuit_no_condition | 45,505 | 44,858 | -1.4% |
| loop_2056_circuit_no_condition | 78,594 | 77,096 | -1.9% |

When 2.1.6 lands in its fast mode it matches (or slightly beats) 2.0.77. **No algorithmic regression exists in the steady-state path.**

### 2. Slow-mode 2.1.6 converges on ~2× the fast-mode time

| Config | 2.1.6 fast (µs) | 2.1.6 slow (µs) | Slow/Fast |
|--------|----------------:|----------------:|----------:|
| loop_128_circuit_no_condition  | 15,508 |  23,388 | 1.51× |
| loop_256_circuit_no_condition  | 19,407 |  35,024 | 1.80× |
| loop_512_circuit_no_condition  | 27,576 |  58,999 | 2.14× |
| loop_1024_circuit_no_condition | 44,858 | 108,649 | 2.42× |
| loop_2056_circuit_no_condition | 77,096 | 202,549 | 2.63× |

The slowdown asymptotically approaches a **2×** factor as the workload grows. A 2× ratio is the canonical signature of a CPU with twice the parallel resources being used at half its capacity.

### 3. The distribution is strictly bimodal — never intermediate

Histogram for `loop_1024_circuit_no_condition_2_1_6` (n = 50):

```
[ 44,858,  49,110): 21 #####################
[ 49,110,  95,891):  0   (nothing in middle)
[ 95,891, 100,143):  0
[100,143, 104,396):  3 ###
[104,396, 108,649): 26 ##########################
```

Every individual run is either fully fast or fully slow. There is no gradient. The behavior is locked at process startup and persists for the entire session (already verified by deleting/recreating entities mid-session — performance does not change).

### 4. 2.0.77 is rock-stable across all workload sizes

| Config | 2.0.77 max/min | 2.1.6 max/min |
|--------|---------------:|---------------:|
| loop_64  | 1.08× | 1.12× |
| loop_128 | 1.19× | 1.51× |
| loop_256 | 1.14× | 1.80× |
| loop_512 | 1.08× | 2.14× |
| loop_1024 | 1.09× | 2.42× |
| loop_2056 | 1.04× | 2.63× |

2.0.77 variance stays under 1.3× regardless of workload size. 2.1.6 variance grows monotonically with batch count.

### 5. Tiny workloads do not exhibit the regression

`loop_16` (256 inserters, 32 batches of 8) shows no bimodal pattern in 2.1.6 (1.07× variance). The bug only manifests once the number of work batches grows large enough that thread placement matters.

## What has been ruled out

The previous round of investigation eliminated every memory-layout and allocator-related hypothesis:

| Hypothesis | Test | Result |
|------------|------|--------|
| Heap allocator non-determinism | mimalloc | Issue persists |
| Memory fragmentation | mimalloc + 8GB huge pages | Issue persists |
| ASLR / pointer addresses | `setarch -R` (quick check, small n) | Inconclusive — being re-tested with n=50 |
| Cross-CCD cache traffic | 9800X3D is single-CCD | N/A |
| OS-specific scheduling | Reproduced on Windows + macOS | Issue persists |
| Clang upgrade | Devs rebuilt 2.1 with clang 21 | Issue persists |
| Hash-container iteration order | Binary inspection — manager uses `std::vector` | Not the cause |
| Entity memory layout | Delete + recreate entities mid-session | Performance unchanged |

## ❌ FALSIFIED: thread placement on hardware threads

The pinning experiment (300 runs, 50 per strategy × 3 strategies × 2 versions, all against `loop_2056_circuit_no_condition`) refuted the hypothesis. See [Pinning experiment results](#pinning-experiment-results) below for the data.

The original hypothesis text is preserved below for reference, but the prediction was wrong on every count.

### Original hypothesis

The 9800X3D has 8 physical cores × 2 SMT threads = 16 hardware threads. SMT siblings share L1, L2, the front-end, and most execution units; throughput per sibling is roughly half of an unshared physical core.

If Factorio's worker pool launches ~16 threads and the OS scheduler initially places them so that:

- **Good placement:** one compute-heavy thread per physical core → all 8 cores deliver full throughput.
- **Bad placement:** pairs of compute-heavy threads land on the same physical core (sharing SMT) while other physical cores stay idle → effective throughput halves.

This single hypothesis explains every observation:

- ✅ **Binary on/off distribution** — placement is decided once and locked.
- ✅ **~2× ratio at scale** — SMT sibling sharing gives ~half throughput per logical thread.
- ✅ **Stable within session** — thread affinity / CPU placement persists.
- ✅ **Varies between launches** — initial scheduler placement is non-deterministic.
- ✅ **Cross-platform** — every modern OS scheduler has the same freedom.
- ✅ **ASLR / allocator independent** — these don't influence CPU placement.
- ✅ **Entity recreation invariant** — game logic doesn't touch worker thread placement.
- ✅ **Disappears for tiny workloads** — when each batch completes in microseconds, placement imbalance gets averaged away.
- ✅ **Worsens with batch count** — the longer the parallel section runs, the more placement matters.
- ✅ **Fast-mode 2.1.6 matches 2.0.77** — when placement is lucky, the algorithm is just as fast as before.

What changed between 2.0.77 and 2.1.6 is likely **how worker threads are created or affinitized**, not anything about the data structures or update logic. 2.0.77 may have set explicit thread affinity or used a thread-creation order that the scheduler handles well; 2.1.6 may have removed that hint or changed the spawn pattern.

## Test plan: pin worker threads with `taskset`

If thread placement is the cause, we can prove it by removing the scheduler's freedom. The 9800X3D CPU topology is:

| Physical core | Hardware threads |
|--------------:|------------------|
| 0 | CPU 0, CPU 8 |
| 1 | CPU 1, CPU 9 |
| 2 | CPU 2, CPU 10 |
| 3 | CPU 3, CPU 11 |
| 4 | CPU 4, CPU 12 |
| 5 | CPU 5, CPU 13 |
| 6 | CPU 6, CPU 14 |
| 7 | CPU 7, CPU 15 |

Three pinning strategies will produce sharply different expected outcomes:

| Strategy | `taskset -c` mask | Description | Predicted result |
|----------|-------------------|-------------|------------------|
| `physical_8` | `0-7` | Force the process onto a single SMT sibling per physical core. One compute thread per physical core, full throughput possible. | **Consistently fast.** No bimodal variance. |

## Pinning experiment results

50 runs per cell, `controlBehaviorUpdate_average` in µs, classified against a 130,000 µs cutoff between the two clusters.

### Per-strategy distribution (controlBehaviorUpdate)

| Version | Strategy | n | min | p25 | median | p75 | max | mean | stdev |
|---------|----------|---:|---:|---:|---:|---:|---:|---:|---:|
| 2.0.77 | physical_8 | 50 | 78,046 | 79,213 | 79,831 | 80,750 | 89,902 | 80,478 | 2,205 |
| 2.0.77 | full_16    | 50 | 78,342 | 79,312 | 79,640 | 80,220 | 83,521 | 79,791 | 944 |
| 2.0.77 | smt_8      | 50 | 78,732 | 79,912 | 80,432 | 81,628 | 93,896 | 81,159 | 2,531 |
| 2.1.6  | physical_8 | 50 | 77,030 | 77,933 | 79,312 | 197,359 | 199,485 | 135,437 | 60,344 |
| 2.1.6  | full_16    | 50 | 77,607 | 78,956 | 81,432 | 198,512 | 209,923 | 132,333 | 60,012 |
| 2.1.6  | smt_8      | 50 | 77,440 | 79,013 | 196,969 | 198,597 | 205,827 | 141,522 | 60,714 |

### Cluster decomposition (2.1.6, cb_update < 130k = fast)

| Strategy | fast | slow | fast mean | slow mean | gap between clusters |
|---|---:|---:|---:|---:|---:|
| pin_physical_8 (SMT contention impossible) | 26 | 24 | 78,052 | 197,605 | 115,719 µs |
| pin_full_16    (default behavior)          | 28 | 22 | 79,737 | 199,273 | 100,925 µs |
| pin_smt_8      (forced SMT contention)     | 24 | 26 | 78,986 | 199,248 | 116,187 µs |

### Run-order pattern (1 = slow, 0 = fast)

```
physical_8  10010110100001101111000100000110011001110011010011  (24 flips / 49)
full_16     00100001001110100100111111000000010011111110100000  (18 flips / 49)
smt_8       10000111100111100110111001010100101010100100110011  (28 flips / 49)
```

A random Bernoulli(0.5) sequence of length 50 has an expected ~24.5 flips. All three configs are statistically indistinguishable from independent coin flips between runs. **Mode is rolled at process startup and is independent of CPU mask.**

### Why the hypothesis failed every prediction

| Prediction | Result |
|---|---|
| `pin_physical_8` collapses bimodal → fast only | **Wrong.** 26/24 split with the same 2.5× ratio. SMT sharing was *prevented entirely* and the slow mode still appeared. |
| `pin_smt_8` forces 100% slow runs | **Wrong.** 24/26 split — indistinguishable from default. |
| `pin_full_16` reproduces default bimodal | Correct, but trivially — it *is* the default. |
| 2.0.77 should be much less sensitive | Correct, but trivially — 2.0.77 has no bimodal pattern at all. |

The decisive datapoint is `pin_physical_8`: cores 0–7 only, one hardware thread per physical core, **SMT sibling contention is mechanically impossible**, and the bimodal distribution still appears with the same fast/slow medians as default. The cause of the bimodal split cannot involve sibling-thread placement on a physical core.

### Cross-strategy fast/slow mode equivalence

| Mode | physical_8 mean | full_16 mean | smt_8 mean |
|---|---:|---:|---:|
| Fast | 78,052 | 79,737 | 78,986 |
| Slow | 197,605 | 199,273 | 199,248 |

The fast and slow modes have identical means across strategies. CPU pinning does not shift either cluster, only the random selection between them.

## What this leaves on the table

The mode switch is decided per process at startup, is binary, is independent of CPU affinity, and is independent of SMT topology. Process-startup-time non-determinism that can cause a binary ~2× performance split:

1. **Address space layout (ASLR).** Allocations land at different virtual addresses each launch. A hot 2.1.6 data structure (e.g. the `activeBehaviors` vector or a per-worker scratch buffer added in 2.1) could collide in L1/L2 cache sets with another hot allocation on roughly half of launches.
2. **Heap allocator alignment.** glibc malloc's arena placement varies; mimalloc with huge pages forces consistent alignment. Previously tested briefly but worth re-checking specifically against the 2056 workload with cluster decomposition.
3. **TLS / per-thread arena allocation order.** The order in which worker threads first touch heap memory determines which arena their per-thread storage lands in.

The previous ASLR test mentioned in the ruled-out table was a quick sanity check on a smaller dataset. With 50 runs and the now-known 50/50 split, an ASLR-disabled run should produce either:
- **All 50 fast (or all 50 slow):** ASLR-driven cache aliasing confirmed.
- **Still ~50/50 split:** ASLR is independent of the cause; look at allocator and TLS next.

## Next experiment: ASLR disabled

The `aslr_off` launcher set wraps the existing physical pinning with `setarch $(uname -m) -R`. Pinning is kept on to remove placement noise from the result (the previous experiment showed pinning does not change the cluster medians, so any per-run variance left is attributable to non-placement causes).

| Launcher | Wrapper | Description |
|---|---|---|
| `factorio_2_0_aslr_off` | `setarch -R taskset -c 0-7` | 2.0.77 baseline, ASLR off, physical pinning |
| `factorio_2_1_aslr_off` | `setarch -R taskset -c 0-7` | 2.1.6 candidate, ASLR off, physical pinning |

Run with `benchmark_aslr.sh`, aggregate with `chart_agg_aslr.sh`.

## ❌ FALSIFIED: ASLR / virtual address layout

The ASLR-off experiment (50 runs × 2 versions against `loop_2056_circuit_no_condition`, with physical pinning retained) refuted the address-aliasing hypothesis. 2.1.6 remained strictly bimodal with identical fast and slow cluster locations.

### ASLR-off distribution (controlBehaviorUpdate, µs)

| Version | n | min | p25 | median | p75 | max | mean | stdev |
|---------|---:|---:|---:|---:|---:|---:|---:|---:|
| 2.0.77 aslr_off | 50 | 78,820 | 79,752 | 80,067 | 80,455 | 81,570 | 80,064 | **603** |
| 2.1.6 aslr_off  | 50 | 77,319 | 78,909 | 196,973 | 198,869 | 201,382 | 148,346 | **59,862** |

### ASLR-off cluster decomposition (130k cutoff)

| Version | fast | slow | fast mean | slow mean | gap |
|---|---:|---:|---:|---:|---:|
| 2.0.77 aslr_off | 50 | 0 | 80,064 | — | — |
| 2.1.6 aslr_off  | 21 | 29 | 78,719 | 198,765 | 116,616 µs |

Run-order sequence (1 = slow, 0 = fast):

```
2.0.77  00000000000000000000000000000000000000000000000000  (flips=0)
2.1.6   10010111101110111100010001111110111010111001000010  (flips=23, random≈24.5)
```

### Why ASLR is not the cause

With ASLR disabled the process layout is **deterministic across launches** — every executable section, library, heap base, and stack lives at the same virtual address. If the bimodal split were caused by an address-conditioned cache collision, the outcome would be 100% one mode or the other. Instead it is 21 / 29, still independent coin flips, still 23 / 49 flips between consecutive runs.

The fast and slow cluster medians (78,719 / 198,765 µs) are within 1% of the pinning experiment's values (78,052–79,737 / 197,605–199,273 µs). **The bimodal mechanism is unmoved by either CPU placement or virtual address layout.**

### What ASLR-off *did* tell us

- 2.0.77 stdev dropped to **603 µs** (n=50, zero slow-mode runs, zero flips). 2.0.77 under ASLR-off + pinning is the cleanest baseline yet — confirming the regression is purely a 2.1.6 introduction, not pre-existing noise.
- The previous "ASLR ruled out" entry in the ruled-out table was based on a small-n quick check. The current n=50 result confirms that earlier conclusion was correct for the right reason: same answer, much more confidence.

### Remaining candidates after pinning + ASLR are out

The mode is decided per-process at startup and is independent of:
- CPU affinity / topology (pinning experiment)
- SMT sibling sharing (pinning experiment)
- Virtual address layout (this experiment)

That narrows the cause to startup non-determinism that survives ASLR-off:

1. **glibc malloc arena binding order.** Per-thread arenas are bound lazily on first allocation. The order in which workers first call `malloc()` determines arena layout, which can produce different cache-set utilization between launches independent of ASLR.
2. **Thread creation race in the 2.1.6 lock-free worker pool.** Worker spin-up order could affect false-sharing on the single atomic batch counter the dev confirmed.
3. **Random seed / clock-based RNG state at startup.** Used by something 2.1.6 added during early one-time setup of the worker pool or scratch buffers.

## Next experiment: mimalloc + huge pages (stacked on ASLR-off + pinning)

The most efficient way to test the allocator-arena hypothesis is to replace glibc malloc entirely. mimalloc has deterministic per-thread heaps and, with `MIMALLOC_RESERVE_HUGE_OS_PAGES`, allocates from a reserved pool of 1 GiB huge pages — eliminating both arena-binding non-determinism and allocator cache-line offset variance.

| Launcher | Wrapper | Description |
|---|---|---|
| `factorio_2_0_mimalloc_hp_aslr_off` | `LD_PRELOAD=libmimalloc.so setarch -R taskset -c 0-7` + `MIMALLOC_RESERVE_HUGE_OS_PAGES=4` | 2.0.77, 4 GiB huge pages, ASLR off, pinning |
| `factorio_2_1_mimalloc_hp_aslr_off` | `LD_PRELOAD=libmimalloc.so setarch -R taskset -c 0-7` + `MIMALLOC_RESERVE_HUGE_OS_PAGES=4` | 2.1.6, 4 GiB huge pages, ASLR off, pinning |

mimalloc settings:
- `MIMALLOC_RESERVE_HUGE_OS_PAGES=4` (4 × 1 GiB = 4 GiB pre-reserved at startup)
- `MIMALLOC_PURGE_DELAY=-1` (disable purging — keep memory layout stable across the run)
- `MIMALLOC_SHOW_STATS=1` (print allocator stats on exit)

Run order:
```
./benchmark_mimalloc_hp_aslr.sh
./rename_mimalloc_hp_aslr_results.sh
./chart_agg_mimalloc_hp_aslr.sh
```

### Decision rule

- **2.1.6 collapses to one cluster (all fast or all slow):** glibc arena binding or allocator cache-line offset is the cause. Investigate jemalloc / tcmalloc as cross-checks and report to dev.
- **2.1.6 stays bimodal at 50/50:** the cause is not in the heap allocator. Next step is to instrument the worker pool startup directly (LD_PRELOAD `pthread_create` shim to log thread creation order and stack addresses) and look for non-deterministic ordering correlated with mode.
- **2.0.77 stays unimodal:** expected sanity check. If 2.0.77 becomes bimodal under mimalloc, the allocator interacts with both versions and the hypothesis space shifts back toward something 2.1.6 added that *uses* the allocator differently.

## ❌ FALSIFIED: heap allocator (glibc arena binding)

The mimalloc + 4 GiB huge pages + ASLR off + physical pinning experiment (50 runs × 2 versions against `loop_2056_circuit_no_condition`) ruled out the heap allocator. 2.1.6 remained bimodal with the same multiplicative ratio.

### Mimalloc-stack distribution (controlBehaviorUpdate, µs)

| Version | n | min | p25 | median | p75 | max | mean | stdev |
|---------|---:|---:|---:|---:|---:|---:|---:|---:|
| 2.0.77 mimalloc+hp+aslr_off | 50 | 64,400 | 64,855 | 65,240 | 65,609 | 69,298 | **65,381** | **866** |
| 2.1.6 mimalloc+hp+aslr_off  | 50 | 64,606 | 65,562 | 66,132 | 177,808 | 179,754 | 110,572 | 55,511 |

### Cluster decomposition (130k cutoff)

| Version | fast | slow | fast mean | slow mean | gap |
|---|---:|---:|---:|---:|---:|
| 2.0.77 mimalloc+hp | 50 | 0 | 65,381 | — | — |
| 2.1.6 mimalloc+hp  | 30 | 20 | 65,707 | 177,870 | 108,792 µs |

Run-order sequence (1 = slow, 0 = fast):

```
2.0.77  00000000000000000000000000000000000000000000000000  (flips=0)
2.1.6   10110100101000000011001010100011000001001100110101  (flips=28, random≈24.5)
```

### Cross-experiment summary (2.1.6, cb_update)

| Experiment | fast mean | slow mean | fast n | slow n | slow/fast |
|---|---:|---:|---:|---:|---:|
| pinning physical_8       | 78,052 | 197,605 | 26 | 24 | 2.53× |
| pinning full_16          | 79,737 | 199,273 | 28 | 22 | 2.50× |
| pinning smt_8            | 78,986 | 199,248 | 24 | 26 | 2.52× |
| aslr_off                 | 78,719 | 198,765 | 21 | 29 | 2.52× |
| **mimalloc+hp+aslr_off** | **65,707** | **177,870** | **30** | **20** | **2.71×** |

Across five experiments, fast incidence: 21–30 / 50. Combined: 129 / 250 fast = 51.6%, statistically indistinguishable from 50/50.

### What this tells us beyond ruling out the allocator

**1. The slow mode is a multiplicative per-batch cache effect, not extra fixed work.** When the underlying work gets faster (mimalloc speeds the cb_update path by ~17%), the slow mode speeds up proportionally less (~11%), widening the ratio from 2.52× to 2.71×. Fixed-cost regressions don't behave this way; cache-hit-rate degradations do.

**2. mimalloc + huge pages is an independent perf win for both versions:**

| Metric | 2.0.77 baseline (aslr_off) | 2.0.77 mimalloc+hp | Delta |
|---|---:|---:|---:|
| cb_update         | 80,064 | 65,381 | **−18.3%** |
| entity_update     | 159,322 (pinning) | 113,441 | **−28.8%** |
| whole_update      | 309,086 | 245,891 | **−20.4%** |

The same applies to 2.1.6 fast-mode runs.

**3. There is a separate, non-bimodal entityUpdate regression in 2.1.6.** Under identical mimalloc+hp+aslr_off conditions:
- 2.0.77 entity_update: 113,441 µs (stdev 3,140)
- 2.1.6 entity_update: 134,032 µs (stdev 1,361)
- **+18.1% steady regression, present in every run** regardless of fast or slow mode

This is a separate finding from the bimodal cb_update issue and should be flagged to the dev independently. It is unimodal, reproducible, and consistent in size.

### What remains as candidates after allocator is out

After eliminating CPU placement, SMT sharing, virtual addressing, allocator implementation, allocator arena binding, and TLB pressure (huge pages remove it), the remaining startup non-determinism that can produce a binary 50/50 multiplicative cache effect is in the worker pool itself:

1. **Thread creation order in the 2.1.6 lock-free pool.** `pthread_create` does not guarantee any particular ordering between the parent and child running. The first worker to touch a per-pool scratch structure can end up determining its cache-line layout for all workers.
2. **Per-worker scratch buffer cache aliasing.** If 2.1.6 added per-worker scratch storage with non-deterministic relative offsets, two workers' lines can fall into the same L1/L2 set on roughly half of launches.
3. **Atomic batch counter cache-line placement.** The single atomic counter the dev described could land adjacent to other hot data, causing false-sharing storms on half of process startups.

## Next experiment: collapse to single hardware thread

Forcing `taskset -c 0` reduces the worker pool to either disabled or 1 worker (the existing implementation typically still spawns the parallel section but with a single executor). All worker-pool-related causes — thread spawn order, false sharing between workers, scratch buffer aliasing between workers — are eliminated.

| Launcher | Wrapper | Description |
|---|---|---|
| `factorio_2_0_single_thread` | `LD_PRELOAD=libmimalloc.so setarch -R taskset -c 0` + `MIMALLOC_RESERVE_HUGE_OS_PAGES=4` | 2.0.77 single-thread baseline |
| `factorio_2_1_single_thread` | `LD_PRELOAD=libmimalloc.so setarch -R taskset -c 0` + `MIMALLOC_RESERVE_HUGE_OS_PAGES=4` | 2.1.6 single-thread candidate |

Stacks on the previous controls so the only changed variable is the thread count.

Run order:
```
./benchmark_single_thread.sh
./rename_single_thread_results.sh
./chart_agg_single_thread.sh
```

### Decision rule

- **2.1.6 collapses to one cluster:** the worker pool is the source of the bimodal non-determinism. The dev now has a provably reproducible slow-mode process to profile (or, equivalently, can profile a fast-mode process and look for what scratch / atomic / cache-line difference appears under the parallel path).
- **2.1.6 stays bimodal even single-threaded:** the worker pool is innocent. The cause is on the main thread's startup path — RNG seeding, entity load order, initial sprite/atlas build, or some other one-time setup that 2.1.6 changed. At that point the next move is an `LD_PRELOAD` shim or `perf record` of the first few hundred ticks on a guaranteed fast vs guaranteed slow process.
- **2.0.77 must stay unimodal:** sanity check.

## ⚠️ INCONCLUSIVE: "single thread" via `taskset -c 0`

The first attempt at the single-thread experiment used `taskset -c 0` to pin the process to a single hardware core. The bimodal distribution survived with no change in shape, ratio, or incidence (32/18 fast/slow split, 2.71× ratio, 65,713 / 178,388 µs cluster means — within 0.3% of the multi-thread mimalloc+hp+aslr_off run).

**However, this does not falsify the worker pool.** `taskset` only restricts CPU **affinity**, not thread count. Factorio's update-runner pool still spawned its full complement (default = `min(hardware_concurrency, 32)` = 16 on this machine), the kernel just time-sliced all 16 threads onto core 0. Worker-pool allocations, scratch buffers, atomic batch counter, and thread-creation order races were all still present — only true cross-core cache traffic was eliminated (which the pinning experiment had already ruled out).

The valid conclusions from this run are:
- Cross-core cache coherence is not the cause (already known).
- Fast-mode 2.1.6 cb_update on a single core matches 2.0.77 to within ~1% (median 66,009 vs 65,102 µs).
- The bimodal mechanism does not require multi-core parallelism — but it might still require multi-threaded execution serialized onto one core, which is *not* what we want to test.

A proper single-thread test requires limiting the update-runner pool itself via Factorio's `update-runner-threads-count` config option, not via `taskset`. The next experiment does that with an isolated config file stored under this benchmark directory.

## Next experiment: true single-worker-thread via Factorio config

Factorio exposes `update-runner-threads-count` in `config.ini`. Setting it to `1` makes the simulation use a single worker thread, regardless of `hardware_concurrency`. This is the correct way to eliminate the worker pool from the experiment.

An isolated `config.ini` is stored under [configs/single_worker_thread/](benchmarks/2_1/benchmark_003/configs/single_worker_thread/) so the experiment leaves the user's normal Factorio config untouched. The config also redirects `write-data` into the same directory so no logs / saves / cache touch the user's home folder.

| Launcher | Wrapper | Description |
|---|---|---|
| `factorio_2_0_single_worker_thread` | `LD_PRELOAD=libmimalloc.so setarch -R taskset -c 0-7 -c benchmark-local config` | 2.0.77, 1 worker thread, mimalloc+hp+aslr_off, physical pinning |
| `factorio_2_1_single_worker_thread` | `LD_PRELOAD=libmimalloc.so setarch -R taskset -c 0-7 -c benchmark-local config` | 2.1.6, same stack |

Pinning is kept at `taskset -c 0-7` (one SMT sibling per physical core) — the pinning experiment showed this is neutral on the bimodal split, but it caps any remaining cross-core noise.

Run order:
```
./benchmark_single_worker_thread.sh
./rename_single_worker_thread_results.sh
./chart_agg_single_worker_thread.sh
```

### Decision rule

- **2.1.6 collapses to one cluster:** the worker pool is the source of the bimodal non-determinism. Worker spawn order, per-worker scratch buffer aliasing, or atomic batch counter cache-line placement is implicated. The dev gains a provably reproducible slow-mode process to profile (or a fast-mode one to diff against).
- **2.1.6 stays bimodal at 50/50 even with one worker thread:** the worker pool is innocent. The cause is on the main thread's startup path — RNG seeding, entity load order, initial sprite/atlas build, or some other one-time setup that 2.1.6 added. Next move is hardware-performance-counter capture (`perf stat`) on a guaranteed-fast vs guaranteed-slow process to identify which cache level / TLB / branch-prediction metric jumps by ~2.7×.
- **2.0.77 must stay unimodal:** sanity check. If it bifurcates here, the cause is something the test itself introduced.

## ✅ Observed: setting `update-runner-threads-count=1` collapses the bimodal split

The true single-worker-thread experiment (50 runs × 2 versions, `update-runner-threads-count=1` via local config + mimalloc + 4 GiB huge pages + ASLR off + `taskset -c 0-7`, against `loop_2056_circuit_no_condition`) produced tight unimodal distributions on both versions.

### Single-worker-thread distribution (controlBehaviorUpdate, µs)

| Version | n | min | p25 | median | p75 | max | mean | stdev | cv% |
|---------|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 2.0.77 single_worker_thread | 50 | 195,686 | 197,086 | 198,947 | 199,278 | 206,123 | 198,577 | 1,664 | **0.84%** |
| 2.1.6 single_worker_thread  | 50 | 192,621 | 193,438 | 194,923 | 195,196 | 196,167 | **194,526** | **997** | **0.51%** |

### Mode detection

| Version | range (% of min) | largest gap between adjacent sorted runs | fast / slow |
|---|---:|---:|---:|
| 2.0.77 | 5.33% | 5,807 µs (2.97% of min — single outlier at run #50) | 50 / 0 |
| 2.1.6  | **1.84%** | **724 µs (0.38% of min)** | **50 / 0** |

Run-order at the 1.10× min threshold: zero flips for both versions. No bimodal, no intermediate, no drift.

### Variance collapse vs prior experiments (2.1.6, cb_update)

| Experiment | fast n | slow n | stdev (µs) | cv% |
|---|---:|---:|---:|---:|
| pinning physical_8                | 26 | 24 | 60,344 | 44.5% |
| pinning full_16                   | 28 | 22 | 60,012 | 45.3% |
| pinning smt_8                     | 24 | 26 | 60,714 | 42.9% |
| aslr_off                          | 21 | 29 | 59,862 | 40.4% |
| mimalloc+hp+aslr_off              | 30 | 20 | 55,511 | 50.2% |
| taskset_c0 (flawed)               | 32 | 18 | 54,638 | 51.4% |
| **single_worker_thread (true)**   | **50** | **0** | **997** | **0.51%** |

stdev dropped from ~60,000 µs to 997 µs — a 60× reduction.

### Numerical observations

**1. 2.1.6 median cb_update is 2% lower than 2.0.77 in this configuration.**

| Stat | 2.0.77 single_worker_thread | 2.1.6 single_worker_thread | Ratio |
|---|---:|---:|---:|
| Mean cb_update   | 198,577 | 194,526 | 0.9796× |
| Median cb_update | 198,947 | 194,923 | 0.9798× |

**2. Comparison of absolute cb_update values across the experiment set:**

| Mode | 2.0.77 | 2.1.6 | Speedup vs that version's 1-thread |
|---|---:|---:|---:|
| 1 worker thread         | 198,577 | 194,526 | 1.0× (baseline) |
| 16 thread, fast cluster | ~79,000 | ~66,000 | 2.5× / 3.0× |
| 16 thread, slow cluster | (n/a, 2.0.77 doesn't bifurcate) | ~178,000 | 1.1× |

The 2.1.6 slow cluster's absolute cb_update (~178,000 µs) is within 9% of its single-worker-thread median (194,923 µs).

## What the data supports

**1.** The bimodal cb_update distribution observed on 2.1.6 across all prior experiments requires `update-runner-threads-count ≥ 2`. At N=1 it does not appear.

**2.** Under the prior multi-worker configurations (pinning variants, ASLR off, mimalloc + huge pages, the flawed `taskset -c 0` test), 2.0.77 did not exhibit the bimodal split, and 2.1.6 did, with ~50/50 frequency that was insensitive to every environmental control tested.

**3.** At N=1, both versions are unimodal; 2.1.6's median cb_update is ~2% below 2.0.77's in this single configuration on the single save tested.

## What the data does *not* establish

The single-worker-thread experiment **does not identify which code path** is responsible for the bimodal behavior at N ≥ 2. Hypotheses consistent with these results include, but are not limited to:

- A change inside the update-runner worker pool itself between 2.0.77 and 2.1.6 (synchronization primitive, dispatch path, per-worker state allocation).
- The same pool implementation being given differently structured work in 2.1.6, such that contention/false-sharing only manifests when the work is partitioned across ≥2 workers.
- A change on the main thread or in load-time initialization that produces state which only becomes observable as variance when ≥2 workers consume it concurrently.

This experiment cannot discriminate among these. Specific mechanisms named in earlier drafts (lock-free design, single atomic batch counter, deterministic batches of 8, per-worker scratch buffer aliasing, wake-up race, etc.) are **not** supported by the data gathered here and should not be cited as findings.

## What would narrow it further

- **N-thread sweep** (`update-runner-threads-count` ∈ {1, 2, 4, 8, 16}, both versions): determines the smallest N at which 2.1.6 bifurcates, and whether 2.0.77 ever bifurcates at any N. Quick to run with existing infrastructure.
- **`perf stat` deltas** on a fast vs slow 16-thread 2.1.6 run: identifies which class of stall (L1/L2 miss, TLB, frontend, branch) accounts for the gap.
- **`perf c2c`** on the same pair: if the slow run shows heavy cross-core HITM traffic on specific cache lines and the fast run does not, that names the contention site by address.
- **Repeating the experiment on a second save file** with different cb_update workload shape (e.g., `loop_512` and a non-circuit save): rules out save-specific artifacts.

## Summary of findings

| # | Finding |
|---|---|
| 1 | On `loop_2056_circuit_no_condition`, 2.1.6 `ControlBehaviorManager::update` exhibits a strictly bimodal performance distribution at process startup: ~50% of launches run at the same speed as 2.0.77, ~50% run at ~2.5× the cost. The distribution is binary, not continuous (within these 50-run samples). |
| 2 | Across the configurations tested, the mode appears locked at process startup and is independent of save file (within the saves tested), entity recreation, CPU placement, SMT topology, ASLR, allocator implementation, and huge-page reservation. |
| 3 | Setting `update-runner-threads-count=1` collapses the bimodal split entirely on both versions. Both produce tight (cv ≤ 0.84%) unimodal distributions in this configuration. |
| 4 | At N=1 on the save tested, 2.1.6 median cb_update is ~2% below 2.0.77 (194,923 µs vs 198,947 µs). |
| 5 | In 2.1.6 slow-cluster 16-thread runs, cb_update is within 9% of the 2.1.6 single-worker-thread median, i.e. the pool's parallel speedup in slow mode is approximately 1.1× rather than the ~3.0× seen in fast mode. |
| 6 | The source-level mechanism responsible for the bimodal behavior at N ≥ 2 is **not identified** by these experiments. The data establish only that it lives somewhere in the code path active when ≥2 update-runner threads are configured. |
| 7 | **Separate finding (non-bimodal):** 2.1.6 `entityUpdate` is steadily +18% vs 2.0.77 across the configurations tested (113,441 → 134,032 µs under mimalloc+hp+aslr_off on `loop_2056_circuit_no_condition`). Unimodal, reproducible across the experiments here. Worth flagging independently. |

## N-thread sweep (N ∈ {2, 4, 8, 16})

50 runs × 2 versions × 4 N values, `loop_2056_circuit_no_condition`. Same stack as `single_worker_thread` (mimalloc + 4 GiB huge pages + ASLR off + gamemoderun). Pinning: `taskset -c 0-7` for N ∈ {2, 4, 8}; `taskset -c 0-15` for N=16 (full SMT — matches the prior bimodal-positive 16-thread runs since N=16 oversubscribes 8 physical cores). N=1 column reuses the existing `single_worker_thread` results.

### Distribution per (version, N), controlBehaviorUpdate µs

| version | N | n | min | p25 | median | p75 | max | mean | stdev | cv% | max/min |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 2.0.77 | 1  | 50 | 195,686 | 197,086 | 198,947 | 199,278 | 206,123 | 198,577 | 1,664 | 0.84% | 1.05× |
| 2.0.77 | 2  | 50 | 139,415 | 141,295 | 142,903 | 177,300 | 183,355 | 153,972 | 17,873 | 11.61% | **1.32×** |
| 2.0.77 | 4  | 50 |  89,952 | 131,702 | 132,395 | 133,185 | 134,604 | 130,018 | 10,200 | 7.84% | **1.50×** |
| 2.0.77 | 8  | 50 |  76,638 |  77,551 |  78,179 |  78,899 |  80,457 |  78,311 | 982 | 1.25% | 1.05× |
| 2.0.77 | 16 | 50 |  64,535 |  64,888 |  65,099 |  65,449 |  66,101 |  65,167 | 392 | 0.60% | 1.02× |
| 2.1.6  | 1  | 50 | 192,621 | 193,438 | 194,923 | 195,196 | 196,167 | 194,526 | 997 | 0.51% | 1.02× |
| 2.1.6  | 2  | 50 | 140,011 | 171,313 | 180,393 | 195,294 | 246,341 | 186,053 | 28,784 | 15.47% | **1.76×** |
| 2.1.6  | 4  | 50 |  87,936 |  89,995 |  91,485 | 192,594 | 200,675 | 132,467 | 51,060 | 38.55% | **2.28×** |
| 2.1.6  | 8  | 50 |  76,489 |  77,996 |  78,915 | 196,675 | 204,680 | 128,305 | 59,592 | 46.45% | **2.68×** |
| 2.1.6  | 16 | 50 |  64,502 |  65,500 |  65,869 | 177,152 | 179,548 | 112,498 | 55,794 | 49.60% | **2.78×** |

### Cluster decomposition (1.30× min threshold)

| version | N | fast n | fast mean | slow n | slow mean | slow/fast |
|---|---:|---:|---:|---:|---:|---:|
| 2.0.77 | 2  | 46 | 151,462 |  4 | 182,839 | 1.21× |
| 2.0.77 | 4  |  **3** |  90,211 | **47** | 132,559 | 1.47× |
| 2.0.77 | 8  | 50 | 78,311 |  0 | — | — |
| 2.0.77 | 16 | 50 | 65,167 |  0 | — | — |
| 2.1.6  | 2  | 27 | 165,426 | 23 | 210,267 | 1.27× |
| 2.1.6  | 4  | 29 |  90,122 | 21 | 190,943 | 2.12× |
| 2.1.6  | 8  | 29 |  78,135 | 21 | 197,587 | 2.53× |
| 2.1.6  | 16 | 29 |  65,500 | 21 | 177,400 | 2.71× |

### Run-order flip counts (out of 49 consecutive transitions, 1=above 1.10× min)

| version | N | flips |
|---|---:|---:|
| 2.0.77 | 1  | 0  |
| 2.0.77 | 2  | 23 |
| 2.0.77 | 4  | 6  |
| 2.0.77 | 8  | 0  |
| 2.0.77 | 16 | 0  |
| 2.1.6  | 1  | 0  |
| 2.1.6  | 2  | 11 |
| 2.1.6  | 4  | 29 |
| 2.1.6  | 8  | 20 |
| 2.1.6  | 16 | 29 |

A random Bernoulli sequence of length 50 has expected ~24.5 flips. The high flip counts at the bimodal cells confirm each launch is an independent draw — the mode is rolled per-process, not by global drift across the test session.

### Parallel speedup (vs each version's own N=1 median)

| version | N | median cb (µs) | speedup | efficiency |
|---|---:|---:|---:|---:|
| 2.0.77 | 1  | 198,947 | 1.00× | 100.0% |
| 2.0.77 | 2  | 142,903 | 1.39× | 69.6% |
| 2.0.77 | 4  | 132,395 | 1.50× | 37.6% |
| 2.0.77 | 8  |  78,179 | 2.54× | 31.8% |
| 2.0.77 | 16 |  65,099 | 3.06× | 19.1% |
| 2.1.6  | 1  | 194,923 | 1.00× | 100.0% |
| 2.1.6  | 2  | 180,393 | 1.08× | 54.0% |
| 2.1.6  | 4  |  91,485 | 2.13× | 53.3% |
| 2.1.6  | 8  |  78,915 | 2.47× | 30.9% |
| 2.1.6  | 16 |  65,869 | 2.96× | 18.5% |

### Retraction: 2.0.77 also bifurcates

The narrative in earlier sections of this document — and in particular in the previously-removed "What this confirms" paragraph that claimed "2.0.77's worker pool always achieves the parallel speedup, it never enters slow mode under any experiment" — **was wrong**. 2.0.77 is bimodal at N=2 (cv 11.6%, max/min 1.32×) and most starkly at N=4, where 47 of 50 runs landed in the slow cluster (~132k µs, only 1.50× speedup over N=1 instead of the expected ~4×). 2.0.77 only happens to be unimodal at N=8 and N=16 — which is why every prior experiment in this benchmark (all of which used the default ~16 workers) saw 2.0.77 as bimodal-free. That was a property of the chosen N, not of the version.

### What the N-sweep supports

1. **Both versions exhibit a bimodal cb_update distribution at some N values.** The smallest N at which each version bifurcates is N=2.
2. **2.1.6 bifurcates at every N ∈ {2, 4, 8, 16} tested**, with a remarkably stable ~58/42 fast/slow split (29/21 at N=4, 29/21 at N=8, 29/21 at N=16 — three identical splits). At N=2 the split is similar (27/23) but the fast cluster is itself slow (median 180k µs vs N=1's 195k µs).
3. **2.0.77 bifurcates at N=2 and N=4**, but is unimodal at N=8 and N=16 within these 50-run samples.
4. **The slow cluster's absolute cb_update value is approximately N-invariant for 2.1.6 at N ≥ 4**: ~190k, ~198k, ~177k µs. Compare to 2.1.6 N=1's 195k µs. In slow mode the pool barely parallelizes regardless of how many workers are configured.
5. **The slow/fast ratio for 2.1.6 grows monotonically with N**: 1.27× → 2.12× → 2.53× → 2.71×. The fast cluster scales with parallelism; the slow cluster does not.
6. **At every N, the 2.1.6 fast cluster matches or beats 2.0.77's median.** At N=16: 65,500 (2.1.6 fast) vs 65,099 (2.0.77) — within 0.6%. No algorithmic regression in cb_update.
7. **Parallel efficiency caps at ~19% at N=16 in fast mode on both versions.** The workload appears bandwidth- or contention-limited beyond 8 cores even when everything goes right.

### What the N-sweep does *not* establish

- **The source-level mechanism is still not identified.** Multiple explanations remain consistent with the data, including:
  - A shared mechanism affecting both versions with 2.1.6's pool more sensitive (2.1.6's slow cluster scales worse than 2.0.77's slow cluster).
  - Two different mechanisms — one that primarily hits 2.0.77 at N=4 and another that hits 2.1.6 at every N ≥ 2.
  - A single mechanism whose probability of degradation depends on N and on pinning, where 2.0.77 at N ∈ {8, 16} happens to land below the trigger threshold.
- **Whether the same mechanism triggers in both versions is not determinable from these experiments.** Same per-N slow cluster *absolute values* between the two versions at N=4 (2.0.77 slow mean 132,559; 2.1.6 slow mean 190,943) — these are *not* the same. So the slow mode does not look like the same failure in both versions.
- **The strange N=4 behavior in 2.0.77** (47/50 slow, only 1.50× speedup) is unexplained. It looks like a different mode of failure from 2.1.6's slow cluster: 2.0.77 N=4 slow cluster mean (132,559 µs) is *less* than 2.0.77 N=2 means (151,462 fast / 182,839 slow), so it's getting some parallel benefit, just not the expected amount.

### Updated cross-experiment summary

| Experiment | 2.0.77 fast n / slow n | 2.1.6 fast n / slow n | 2.1.6 slow/fast ratio |
|---|---|---|---:|
| pinning physical_8 (default N) | 50 / 0 | 26 / 24 | 2.53× |
| pinning full_16 (default N)    | 50 / 0 | 28 / 22 | 2.50× |
| pinning smt_8 (default N)      | 50 / 0 | 24 / 26 | 2.52× |
| aslr_off                       | 50 / 0 | 21 / 29 | 2.52× |
| mimalloc+hp+aslr_off           | 50 / 0 | 30 / 20 | 2.71× |
| taskset_c0 (flawed)            | 50 / 0 | 32 / 18 | 2.71× |
| **N-sweep N=1**                | 50 / 0 | 50 / 0  | — |
| **N-sweep N=2**                | 46 / 4 | 27 / 23 | 1.27× |
| **N-sweep N=4**                | **3 / 47** | 29 / 21 | 2.12× |
| **N-sweep N=8**                | 50 / 0 | 29 / 21 | 2.53× |
| **N-sweep N=16**               | 50 / 0 | 29 / 21 | 2.71× |

## Source-level context from the dev (boskid, Discord)

Information stated by the engine dev about how the control-behavior worker pool operates. Recorded here verbatim-in-substance for hypothesis design; treat as background, not as data measured by this benchmark.

- Control behaviors are processed in **deterministic batches of 8** (indices 0–7, 8–15, ...). Required for multiplayer determinism.
- All control behavior types share the same batched dispatch: a batch can mix deciders, inserter behaviors, lamp behaviors, etc. (per dev's example: decider at index 0, inserters at 1–7, lamps at 8–12 — first batch is the decider + 7 inserters, second is 5 lamps).
- Control behaviors **do not touch entity active state directly.** They compute against the circuit network and may emit a "wakeup request" for their owner entity if a state change warrants it.
- **Each worker thread has its own wakeup-request queue.** Workers append to their own queue only; nothing is shared at the queue-write level during the parallel section.
- Workers **do not block each other** during the parallel section. The only block is the main thread waiting for all workers to finish.
- When all workers finish, the main thread drains the per-worker queues in **ascending batch-index order** to preserve MP determinism.
- Workers continue past their initial batch — when one finishes its batch, it "looks for more stuff to do." The dispatch mechanism the workers use to claim further batches is shared state, but its exact implementation (locked, lock-free, work-stealing) is not stated.

### Implications for the `loop_2056_circuit_no_condition` workload

The save used in every experiment in this document has all inserters wired to a circuit network but with **no enabled-if condition** set on any inserter. Concretely:

- Workers read the circuit-network state each tick and evaluate each inserter's behavior.
- Because no enabled-if condition exists, **no state transition occurs that would warrant emitting a wakeup-request.** Per-worker wakeup-request queues should stay near-empty for the duration of the benchmark.
- This makes the workload essentially a **parallel read-mostly evaluation** of a shared circuit-network state.

If wakeup-queue traffic is genuinely negligible on this save (worth confirming with the dev), it weakens the false-sharing-on-wakeup-queue hypothesis for this specific benchmark. The slow mode would have to be caused by something else that all workers touch — most plausibly:

- The shared structure the workers use to claim "more stuff to do" past their initial batch.
- A shared, frequently-read piece of circuit-network or behavior state whose cache line happens to be co-located with a frequently-written variable (counter, stats slot, atomic) in ~half of process layouts.
- Per-worker structures other than the wakeup-queue (TLS slots, the worker's batch-counter state, etc.) whose inter-worker offset / alignment varies across launches.

None of these is supported by data here; they are the hypothesis surface that survives both the N-sweep and the dev's confirmed model. The next discriminating experiment is `perf c2c` on a fast vs slow 16-thread run to see directly which cache lines are hot for cross-core invalidation traffic.
