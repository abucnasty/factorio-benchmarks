param (
    # number of ticks to run per save file
    [int]$ticks = 108000,
    # number of runs
    [int]$runs = 2
)
 belt benchmark ../maps `
    --ticks $ticks `
    --runs $runs `
    --run-order random `
    --template-path ../../../../scripts/results.md.hbs `
    --pattern "01*" `
    --output results_01 `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains"