#!/bin/bash
# Aggregate the N-thread sweep results (N=2,4,8,16) into one table and boxplot.
# N=1 stays in its own aggregate (charts/aggregate_single_worker_thread.csv).
# The analysis step reads both aggregates and joins them.
# All CSVs must have been renamed in place first.
set -euo pipefail

belt-charts table "results_n*_threads/loop_*.csv" \
  --remove-first-ticks 1 \
  -o "charts/aggregate_n_thread_sweep.csv" \
  --aggregate-strategy "average" \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"

belt-charts boxplot "results_n*_threads/loop_*.csv" \
  -w 1600 \
  -h 900 \
  --remove-first-ticks 1 \
  --trim-prefix "loop_" \
  -o "charts/n_thread_sweep_distribution.png" \
  --min-update 0
