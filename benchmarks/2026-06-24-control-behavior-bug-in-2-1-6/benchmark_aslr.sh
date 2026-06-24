#!/bin/bash
# Run the ASLR-disabled launcher set against the 2056 save files.
# Output is written to results_aslr_off/ and CSVs include both 2.0.77 and 2.1.6.
set -euo pipefail

script_dir=$(dirname "$0")

ticks="3600"
runs="50"
pattern="*2056*"
out_dir="results_aslr_off"

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

run_one "factorio_2_0_aslr_off" "2_0_77"
run_one "factorio_2_1_aslr_off" "2_1_6"
