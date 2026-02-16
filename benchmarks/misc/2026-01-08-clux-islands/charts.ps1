# belt-charts "results/dmb_*.csv" `
#     -w 1200 `
#     -h 800 `
#     --type "boxplot" `
#     --remove-first-ticks 420 `
#     --aggregate-strategy "average" `
#     -o "charts/summary_run_distribution_all.png" `
#     --trim-prefix "dmb_" `
#     --stddev-filter 1 `
#     --max-update 3 `
#     --min-update 0.0

belt-charts "results/dmb_*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 420 `
    -o "charts/summary_all.png" `
    --aggregate-strategy "average" `
    --trim-prefix "dmb_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate" `
    --summary-table true `
    --summary-table-file true

belt-charts "results/dmb_*.csv" `
    -w 1200 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 60 `
    -o "charts/timeseries.png" `
    --trim-prefix "dmb_" `
    -a "average" `
    --max-ticks 108000 `
    --max-update 14 `
    --tick-window-aggregation 30