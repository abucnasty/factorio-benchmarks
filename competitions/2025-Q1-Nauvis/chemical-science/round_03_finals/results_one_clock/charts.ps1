chart-gen "design_*.csv" `
    -w 1000 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "summary_verbose_metrics_all_designs.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

chart-gen "design_*.csv" `
    -w 2500 `
    -h 1200 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "summary_verbose_metrics_all_designs_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table true

chart-gen "design_*.csv" `
    -w 1000 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 240 `
    --aggregate-strategy "average" `
    -o "summary_run_distribution_all.png" `
    --trim-prefix "design_"