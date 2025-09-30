param (
    # number of ticks to run per save file
    [int]$ticks = 72000,
    # number of runs
    [int]$runs = 6
)

belt benchmark ../temp_maps `
--ticks $ticks `
--runs $runs `
--run-order random `
--template-path ../../../../scripts/results.md.hbs `
--pattern "design_hybrid_06_abucnasty_one_clock*" `
--output results_one_clock `
--strip-prefix "design_" `
--verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains"