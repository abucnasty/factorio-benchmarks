belt-charts "results/bm_5_tiles*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 1 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_all.png" `
    --trim-prefix "bm_5_tiles_backpressure_"

belt-charts "results/bm_5_tiles*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_all_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_5_tiles_backpressure_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/bm_5_tiles*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 1 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_5_tiles_backpressure_" `
    -a "average" `
    --max-ticks 240 `
    --max-update 10 `
    --tick-window-aggregation 1