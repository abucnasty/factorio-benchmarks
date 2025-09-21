# chart-gen "results/design_*.csv" `
#     -w 1000 `
#     -h 800 `
#     --type "summary" `
#     --remove-first-ticks 240 `
#     -o "charts/summary_verbose_metrics_all_designs.png" `
#     --aggregate-strategy "average" `
#     --trim-prefix "design_" `
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
#     --summary-table false

# chart-gen "results/design_*.csv" `
#     -w 2500 `
#     -h 1200 `
#     --type "summary" `
#     --remove-first-ticks 240 `
#     -o "charts/summary_verbose_metrics_all_designs_table.png" `
#     --aggregate-strategy "average" `
#     --trim-prefix "design_" `
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
#     --summary-table true


# chart-gen "results/design_*.csv" `
#     -w 1000 `
#     -h 800 `
#     --type "boxplot" `
#     --remove-first-ticks 240 `
#     --aggregate-strategy "average" `
#     -o "charts/summary_run_distribution_all.png" `
#     --trim-prefix "design_"

# chart-gen "results/design_*.csv" `
#     -w 1400 `
#     -h 800 `
#     --type "bar" `
#     --remove-first-ticks 240 `
#     -o "charts/timeseries_18k/timeseries.png" `
#     -a "average" `
#     --max-ticks 18000  `
#     --max-update 3.5 `
#     --tick-window-aggregation 60 `
#     --trim-prefix "design_"


# chart-gen "results/design_*.csv" `
#     --type "table" `
#     --remove-first-ticks 240 `
#     -o "charts/summary_verbose_metrics_table.csv" `
#     --aggregate-strategy "average" `
#     --trim-prefix "design_" `
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms"

chart-gen "results/design_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 240 `
    -o "charts/timeseries_240/timeseries.png" `
    -a "average" `
    --max-ticks 720  `
    --max-update 3.5 `
    --tick-window-aggregation 0 `
    --trim-prefix "design_"