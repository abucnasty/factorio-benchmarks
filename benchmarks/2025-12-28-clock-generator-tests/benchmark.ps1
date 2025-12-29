param (
    # number of ticks to run per save file
    [int]$ticks = 18000,
    # number of runs
    [int]$runs = 6
)
 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results.md.hbs `
    --pattern "bm_*" `
    --output results `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"