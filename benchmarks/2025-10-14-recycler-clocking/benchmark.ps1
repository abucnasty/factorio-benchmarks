param (
    # number of ticks to run per save file
    [int]$ticks = 7200,
    # number of runs
    [int]$runs = 3
)
 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results.md.hbs `
    --pattern "*[HIJ]*" `
    --output . `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains"