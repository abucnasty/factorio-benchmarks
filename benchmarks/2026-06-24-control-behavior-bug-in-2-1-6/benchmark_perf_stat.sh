#!/bin/bash
# Per-process perf stat capture at N=16, both versions.
#
# Each iteration is one factorio process invoked through the same N=16 launcher
# the prior experiment used (mimalloc + huge pages + ASLR off + gamemoderun +
# taskset -c 0-15). We force --runs 1 so there is exactly one factorio process
# per perf-stat capture: one bimodal coin flip, one cb_update value, one set
# of counters.
#
# Output:
#   results_perf_stat/<version>/<idx>.perf      (perf stat counters)
#   results_perf_stat/<version>/<idx>/loop_*.csv (belt verbose-metrics CSV)
#
# Idempotent: completed iterations are skipped. Bump runs_per_version and
# re-run to extend the data set.
set -euo pipefail

script_dir=$(dirname "$0")
out_root="results_perf_stat"
runs_per_version=30
ticks=3600

# Multiplexed event set. Goes past the 6 PMC the Zen 5 PMU exposes, so perf
# will time-multiplex and scale-extrapolate. Adequate for triage.
events="task-clock,context-switches,cpu-migrations,page-faults,cycles,instructions,branches,branch-misses,cache-references,cache-misses,L1-dcache-loads,L1-dcache-load-misses,LLC-loads,LLC-load-misses,dTLB-loads,dTLB-load-misses"

if ! perf stat -e cycles -- true >/dev/null 2>&1; then
  echo "ERROR: perf stat not usable. Try: sudo sysctl kernel.perf_event_paranoid=-1"
  exit 1
fi

run_one() {
  local launcher="$1" version_pattern="$2" version_tag="$3" idx="$4"
  local out_dir="${out_root}/${version_tag}/${idx}"
  local perf_file="${out_root}/${version_tag}/${idx}.perf"

  if [ -s "${perf_file}" ] && compgen -G "${out_dir}/loop_*_verbose_metrics.csv" >/dev/null; then
    echo "  skip (already done): ${version_tag} ${idx}"
    return 0
  fi

  mkdir -p "${out_dir}"
  echo "=== ${version_tag} run ${idx} ==="
  perf stat -e "${events}" -o "${perf_file}" -- \
    belt --factorio-path "${script_dir}/launchers/${launcher}" \
      benchmark maps \
      --ticks "${ticks}" \
      --runs 1 \
      --run-order sequential \
      --template-path ../../../scripts/results.md.hbs \
      --pattern "*2056*${version_pattern}*" \
      --output "${out_dir}" \
      --verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate"
}

for i in $(seq -w 1 ${runs_per_version}); do
  run_one "factorio_2_0_n16_threads" "2_0_77" "2_0_77" "${i}"
  run_one "factorio_2_1_n16_threads" "2_1_6"  "2_1_6"  "${i}"
done
