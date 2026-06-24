#!/bin/bash
# Run the single-worker-thread (via local Factorio config) launchers against
# the 2056 save files. Output goes to results_single_worker_thread/.
set -euo pipefail

script_dir=$(dirname "$0")

ticks="3600"
runs="50"
pattern="*2056*"
out_dir="results_single_worker_thread"

run_one() {
  local launcher="$1"
  local version_pattern="$2"

  echo "=== Running ${launcher} -> ${out_dir} (pattern: ${pattern}${version_pattern}*) ==="
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

run_one "factorio_2_0_single_worker_thread" "2_0_77"
run_one "factorio_2_1_single_worker_thread" "2_1_6"
