# belt-charts "results/bm_*.csv" `
#     -w 1200 `
#     -h 800 `
#     --type "boxplot" `
#     --remove-first-ticks 420 `
#     --aggregate-strategy "average" `
#     -o "charts/summary_run_distribution_all.png" `
#     --trim-prefix "bm_" `
#     --stddev-filter 1 `
#     --max-update 3 `
#     --min-update 0.0

# belt-charts "results/bm_*.csv" `
#     -w 1500 `
#     -h 800 `
#     --type "summary" `
#     --remove-first-ticks 420 `
#     -o "charts/summary_all.png" `
#     --aggregate-strategy "average" `
#     --trim-prefix "bm_" `
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
#     --summary-table true `
#     --summary-table-file true `
#     --stddev-filter 1

# belt-charts "results/bm_green*.csv" `
#     -w 1200 `
#     -h 800 `
#     --type "summary" `
#     --remove-first-ticks 420 `
#     -o "charts/summary_green.png" `
#     --aggregate-strategy "average" `
#     --trim-prefix "bm_" `
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
#     --summary-table true

# belt-charts "results/bm_blue*.csv" `
#     -w 1200 `
#     -h 800 `
#     --type "summary" `
#     --remove-first-ticks 420 `
#     -o "charts/summary_blue.png" `
#     --aggregate-strategy "average" `
#     --trim-prefix "bm_" `
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
#     --summary-table true `
#     --stddev-filter 1

# belt-charts "results/bm_red*.csv" `
#     -w 1200 `
#     -h 800 `
#     --type "summary" `
#     --remove-first-ticks 420 `
#     -o "charts/summary_red.png" `
#     --aggregate-strategy "average" `
#     --trim-prefix "bm_" `
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
#     --summary-table true `
#     --stddev-filter 1

belt-charts "results/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 420 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_" `
    -a "average" `
    --max-ticks 1024 `
    --max-update 4 `
    --tick-window-aggregation 1 `
    --stddev-filter 1