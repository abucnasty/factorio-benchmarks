#!/bin/bash
# Aggregate the mimalloc + huge pages + ASLR off benchmark results.
# Files were renamed in place by rename_mimalloc_hp_aslr_results.sh.
set -euo pipefail

belt-charts table "results_mimalloc_hp_aslr_off/loop_*.csv" \
  --remove-first-ticks 1 \
  -o "charts/aggregate_mimalloc_hp_aslr.csv" \
  --aggregate-strategy "average" \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"

belt-charts boxplot "results_mimalloc_hp_aslr_off/loop_*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 1 \
  --trim-prefix "loop_" \
  -o "charts/mimalloc_hp_aslr_distribution.svg" \
  --min-update 0
