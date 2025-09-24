param (
    # number of ticks to run per save file
    [int]$ticks = 18000,
    # number of runs
    [int]$runs = 10
)

belt benchmark maps `
--ticks $ticks `
--runs $runs `
--run-order random `
--template-path ../../../../scripts/results.md.hbs `
--pattern "red_360_thaeln*" `
--output results_red_round_02 `
--strip-prefix "red_360_" `
--verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains"