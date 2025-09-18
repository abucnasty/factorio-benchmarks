
chart-gen "results/cc_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 60 `
    -o "charts/timeseries.png" `
    -a "minimum" `
    --max-ticks 240 `
    --max-update 0.5


chart-gen "results/cc_*.csv" `
    -w 900 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_all.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "cc_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table true

chart-gen "results/cc_*.csv" `
    -w 900 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 60 `
    --aggregate-strategy "minimum" `
    -o "charts/summary_run_distribution_all.png" `
    --trim-prefix "cc_"