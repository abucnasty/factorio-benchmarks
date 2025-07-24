param (
    # number of ticks to run per save file
    [int]$ticks = 32000,
    # number of runs
    [int]$runs = 6
)


belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*" `
    --output control-comparison-4-science-results-verbose `
    --verbose-metrics "wholeUpdate,transportLinesUpdate,controlBehaviorUpdate,entityUpdate"