param (
    # number of ticks to run per save file
    [int]$ticks = 1200,
    # number of runs
    [int]$runs = 3
)

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*" `
    --output results_1200 `
    --strip-prefix "bench_" `
    --verbose-metrics "wholeUpdate,transportLinesUpdate,controlBehaviorUpdate,entityUpdate"