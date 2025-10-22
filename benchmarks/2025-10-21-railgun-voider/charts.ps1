belt-charts "results_biter_voider/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "results_biter_voider/summary_verbose_metrics_all_designs_table.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "bm_" `
    --max-ticks 16000 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,constructionManagerUpdate,particleUpdate" `
    --summary-table true

belt-charts "results_biter_voider/bm_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 60 `
    -o "results_biter_voider/timeseries.png" `
    --trim-prefix "bm_" `
    -a "minimum" `
    --max-ticks 16000 `
    --max-update 1.6 `
    --tick-window-aggregation 30