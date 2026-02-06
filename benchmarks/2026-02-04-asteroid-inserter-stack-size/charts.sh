belt-charts "results/stack_*.csv" \
  -w 1200 \
  -h 800 \
  --type "boxplot" \
  --remove-first-ticks 30 \
  --aggregate-strategy "average" \
  -o "charts/summary_run_distribution_all.png" \
  --stddev-filter 1

belt-charts "results/stack_*.csv" \
  -w 1500 \
  -h 800 \
  --type "summary" \
  --remove-first-ticks 30 \
  -o "charts/summary.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" \
  --summary-table true \
  --summary-table-file true \
  --stddev-filter 1

belt-charts "results/stack_*.csv" \
  -w 1200 \
  -h 800 \
  --type "bar" \
  --remove-first-ticks 30 \
  -o "charts/timeseries.png" \
  -a "average" \
  --max-ticks 1024 \
  --max-update 4 \
  --tick-window-aggregation 1 \
  --stddev-filter 1
