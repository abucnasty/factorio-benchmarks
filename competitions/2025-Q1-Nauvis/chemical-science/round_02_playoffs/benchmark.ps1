param (
    # number of ticks to run per save file
    [int]$ticks = 36000,
    # number of runs
    [int]$runs = 10
)

belt benchmark ../temp_maps `
--ticks $ticks `
--runs $runs `
--run-order random `
--template-path ../../../../scripts/results.md.hbs `
--pattern "design_*" `
--output results `
--strip-prefix "design_" `
--verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms"