param (
    # number of ticks to run per save file
    [int]$ticks = 3600,
    # number of runs
    [int]$runs = 3
)
 belt benchmark ./maps `
    --ticks $ticks `
    --runs $runs `
    --run-order random `
    --template-path ../../scripts/results.md.hbs `
    --pattern "beacons_*" `
    --output results `
    --strip-prefix "beacons_" `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms"