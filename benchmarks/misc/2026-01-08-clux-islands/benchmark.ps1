param (
    # number of ticks to run per save file
    [int]$ticks = 108000,
    # number of runs
    [int]$runs = 2
)
 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results.md.hbs `
    --pattern "dmb_*" `
    --output results `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate"