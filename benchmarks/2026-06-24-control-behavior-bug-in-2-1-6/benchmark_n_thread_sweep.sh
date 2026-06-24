#!/bin/bash
# N-thread sweep: run the same benchmark with update-runner-threads-count ∈
# {2, 4, 8, 16} on both versions, to determine the smallest N at which the
# bimodal cb_update distribution appears.
#
# N=1 is already covered by results_single_worker_thread/ (use that for the
# N=1 column in the aggregate).
#
# Stack per run: mimalloc + 4 GiB huge pages + ASLR off + gamemoderun.
# Pinning: taskset -c 0-7 for N ∈ {2, 4, 8}; taskset -c 0-15 for N=16
# (matches the pinning used by the prior bimodal-positive 16-thread runs).
set -euo pipefail

script_dir=$(dirname "$0")

ticks="3600"
runs="50"
pattern="*2056*"

run_one() {
  local launcher="$1"
  local version_pattern="$2"
  local out_dir="$3"

  echo "=== ${launcher} -> ${out_dir} (pattern: ${pattern}${version_pattern}*) ==="
  belt --factorio-path "${script_dir}/launchers/${launcher}" \
    benchmark maps \
    --ticks $ticks \
    --runs $runs \
    --run-order sequential \
    --template-path ../../../scripts/results.md.hbs \
    --pattern "${pattern}${version_pattern}*" \
    --output "${out_dir}" \
    --append \
    --verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,trains,fluidFlowUpdate,electricNetworkUpdate,particleUpdate"
}

for N in 02 04 08 16; do
  out_dir="results_n${N}_threads"
  run_one "factorio_2_0_n${N}_threads" "2_0_77" "${out_dir}"
  run_one "factorio_2_1_n${N}_threads" "2_1_6"  "${out_dir}"
done
