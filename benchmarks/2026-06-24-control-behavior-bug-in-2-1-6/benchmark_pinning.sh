#!/bin/bash
# Run all three pinning strategies for both Factorio versions against the 2056 save files.
# Each strategy writes to its own results folder so they can be aggregated separately.
set -euo pipefail

script_dir=$(dirname "$0")

# number of ticks to run per save file
ticks="3600"
# number of runs
runs="50"

# Pattern: only the 2056 saves
pattern="*2056*"

run_one() {
  local launcher="$1"
  local out_dir="$2"
  local version_pattern="$3"

  echo "=== Running ${launcher} -> ${out_dir} (pattern: *${pattern}*${version_pattern}*) ==="
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

# physical_8: one SMT sibling per physical core (predicted: consistently fast)
run_one "factorio_2_0_pin_physical_8" "results_pin_physical_8" "2_0_77"
run_one "factorio_2_1_pin_physical_8" "results_pin_physical_8" "2_1_6"

# full_16: all 16 hw threads (predicted: bimodal, same as default)
run_one "factorio_2_0_pin_full_16" "results_pin_full_16" "2_0_77"
run_one "factorio_2_1_pin_full_16" "results_pin_full_16" "2_1_6"

# smt_8: 4 physical cores both siblings (predicted: consistently slow)
run_one "factorio_2_0_pin_smt_8" "results_pin_smt_8" "2_0_77"
run_one "factorio_2_1_pin_smt_8" "results_pin_smt_8" "2_1_6"
