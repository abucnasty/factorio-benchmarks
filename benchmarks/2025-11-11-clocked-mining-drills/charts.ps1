belt-charts "results/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 60 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_all.png" `
    --trim-prefix "bm_mining_drill_"

belt-charts "results/bm_*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_all_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_mining_drill_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true `
    --summary-table-file true

belt-charts "results/bm_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 60 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_mining_drill_" `
    -a "average" `
    --max-ticks 9600 `
    --max-update 2 `
    --tick-window-aggregation 30