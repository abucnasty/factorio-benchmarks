chart-gen "design_*.csv" `
    -w 1400 `
    -h 1200 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "summary_verbose_metrics_below_baseline.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table true