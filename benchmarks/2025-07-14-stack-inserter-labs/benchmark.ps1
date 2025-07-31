param (
    # number of ticks to run per save file
    [int]$ticks = 32000,
    # number of runs
    [int]$runs = 3
)

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*explosives*" `
    --output control-comparison-agri-science-results-v1-11 `
    --verbose-metrics "wholeUpdate"

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*bot_speed*" `
    --output control-comparison-7-science-results-v1-11 `
    --verbose-metrics "wholeUpdate"

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*research_prod*" `
    --output control-comparison-12-science-results-v1-11 `
    --verbose-metrics "wholeUpdate"

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*steel_prod*" `
    --output control-comparison-4-science-results-v1-11 `
    --verbose-metrics "wholeUpdate"