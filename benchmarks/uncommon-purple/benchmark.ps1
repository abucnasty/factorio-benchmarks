param (
    # number of ticks to run per save file
    [int]$ticks = 5000,
    # number of runs
    [int]$runs = 5
)

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --output results