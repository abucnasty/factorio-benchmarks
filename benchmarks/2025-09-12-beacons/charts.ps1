
chart-gen "results/beacons_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 267 `
    -o "charts/timeseries.png" `
    -a "average" `
    --max-ticks 508


chart-gen "results/beacons_*.csv" `
    -w 1000 `
    -h 1200 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "charts/summary_verbose_metrics_all.png" `
    --aggregate-strategy "average" `
    --trim-prefix "beacons_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table true

chart-gen "results/beacons_*.csv" `
    -w 1000 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 240 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_all.png" `
    --trim-prefix "beacons_"