param (
    # number of ticks to run per save file
    [int]$ticks = 600,
    # number of runs
    [int]$runs = 3
)

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --output results