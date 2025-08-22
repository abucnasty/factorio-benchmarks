param (
    # number of ticks to run per save file
    [int]$ticks = 36000,
    # number of runs
    [int]$runs = 3
)
 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results.md.hbs `
    --pattern "q2_red*" `
    --output . `
    --strip-prefix "q2_red_" `
    --verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate"

chart-gen "q2_red*.csv"