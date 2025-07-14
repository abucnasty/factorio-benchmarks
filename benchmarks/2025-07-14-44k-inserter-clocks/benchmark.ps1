param (
    # number of ticks to run per save file
    [int]$ticks = 6000,
    # number of runs
    [int]$runs = 10
)

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "bench_44k*" `
    --output .