#!/bin/bash
# Aggregate the single-thread benchmark results.
# Files were renamed in place by rename_single_thread_results.sh.
set -euo pipefail

belt-charts table "results_single_thread/loop_*.csv" \
  --remove-first-ticks 1 \
  -o "charts/aggregate_single_thread.csv" \
  --aggregate-strategy "average" \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"

belt-charts boxplot "results_single_thread/loop_*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 1 \
  --trim-prefix "loop_" \
  -o "charts/single_thread_distribution.png" \
  --min-update 0
