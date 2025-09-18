param (
    # number of ticks to run per save file
    [int]$ticks = 3600,
    # number of runs
    [int]$runs = 5
)
 belt benchmark ./maps `
    --ticks $ticks `
    --runs $runs `
    --run-order random `
    --template-path ../../scripts/results.md.hbs `
    --pattern "cc_*" `
    --output results `
    --strip-prefix "cc_" `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,entityUpdate"