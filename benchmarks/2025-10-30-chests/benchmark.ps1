param (
    # number of ticks to run per save file
    [int]$ticks = 60,
    # number of runs
    [int]$runs = 10
)
 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order random `
    --template-path ../../scripts/results.md.hbs `
    --pattern "*bm_wagon_8_input*" `
    --output results `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains"