#!/bin/bash
# Aggregate the pinning benchmark results into a single CSV for analysis.
# Per-strategy CSVs were renamed in place by rename_pinning_results.sh so
# their basenames are unique across results_pin_* directories.
set -euo pipefail

belt-charts table "results_pin_*/loop_*.csv" \
  --remove-first-ticks 1 \
  -o "charts/aggregate_pinning.csv" \
  --aggregate-strategy "average" \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"

belt-charts boxplot "results_pin_*/loop_*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 1 \
  --trim-prefix "loop_" \
  -o "charts/pinning_distribution.png" \
  --min-update 0
