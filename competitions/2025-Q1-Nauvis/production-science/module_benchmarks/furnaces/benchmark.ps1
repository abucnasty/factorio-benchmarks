param (
    # number of ticks to run per save file
    [int]$ticks = 36000,
    # number of runs
    [int]$runs = 6
)
 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order random `
    --template-path ../../../../../scripts/results.md.hbs `
    --pattern "*" `
    --output results `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains"