param (
    # number of ticks to run per save file
    [int]$ticks = 10000,
    # number of runs
    [int]$runs = 5,
)

belt benchmark . --ticks $ticks --runs $runs --output ./benchmark-results --template-path ../../scripts/results-template.md.hbs