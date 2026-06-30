#!/bin/bash
# Aggregate the ASLR-off benchmark results into a single CSV for analysis.
# CSVs were renamed in place by rename_aslr_results.sh so their basenames are
# unique from any prior experiment.
set -euo pipefail

belt-charts table "results_aslr_off/loop_*.csv" \
  --remove-first-ticks 1 \
  -o "charts/aggregate_aslr.csv" \
  --aggregate-strategy "average" \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"

belt-charts boxplot "results_aslr_off/loop_*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 1 \
  --trim-prefix "loop_" \
  -o "charts/aslr_distribution.png" \
  --min-update 0
