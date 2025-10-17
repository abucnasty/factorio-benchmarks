belt-charts "bm_*.csv" `
    -w 1000 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 1 `
    --aggregate-strategy "average" `
    -o "summary_run_distribution_all.png" `
    --trim-prefix "bm_ore_"


belt-charts "bm_*.csv" `
    -w 1350 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "summary_verbose_metrics_all_designs_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_ore_" `
    --max-ticks 7200 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table true

belt-charts "bm_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 60 `
    -o "timeseries.png" `
    --trim-prefix "bm_ore_" `
    -a "average" `
    --max-ticks 240 `
    --max-update 14 `
    --tick-window-aggregation 1