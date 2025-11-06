belt-charts "results/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_all_designs_table.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "bm_particles_" `
    --max-ticks 16000 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,particleUpdate" `
    --summary-table true

belt-charts "results/bm_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 60 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_" `
    -a "minimum" `
    --trim-prefix "bm_particles_" `
    --max-ticks 16000 `
    --max-update 0.5 `
    --tick-window-aggregation 30