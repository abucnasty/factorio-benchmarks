belt-charts "design_16_yuu_with_*.csv" `
    -w 800 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "comparison.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_16_yuu_with_ships_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table true