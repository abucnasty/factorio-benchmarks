param (
    # number of ticks to run per save file
    [int]$ticks = 36000, # 10 minutes
    # number of runs
    [int]$runs = 3
)

belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../../scripts/results-template.md.hbs `
    --pattern "red_design*" `
    --output results `
    --strip-prefix "red_design_" `
    --verbose-metrics "wholeUpdate,transportLinesUpdate,entityUpdate"