belt-charts "results/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 120 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_all.png" `
    --trim-prefix "bm_"


belt-charts "results/bm_*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 120 `
    -o "charts/summary_verbose_metrics_all_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true

belt-charts "results/bm_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 120 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_" `
    -a "average" `
    --max-ticks 1200 `
    --max-update 2 `
    --tick-window-aggregation 1