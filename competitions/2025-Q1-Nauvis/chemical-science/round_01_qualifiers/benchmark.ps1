param (
    # number of ticks to run per save file
    [int]$ticks = 18000,
    # number of runs
    [int]$runs = 5
)
 belt benchmark ../maps `
    --ticks $ticks `
    --runs $runs `
    --run-order random `
    --template-path ../../../../scripts/results.md.hbs `
    --pattern "design_*" `
    --output results_affinity_8 `
    --strip-prefix "design_" `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms"