param (
    # number of ticks to run per save file
    [int]$ticks = 3600,
    # number of runs
    [int]$runs = 10
)

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*q1*sync*" `
    --output control-comparison-sync-method

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*desync*" `
    --output control-comparison-quality


belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*steel_prod*" `
    --output control-comparison-4-science-results

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*bot_speed*" `
    --output control-comparison-7-science-results

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*explosives*" `
    --output control-comparison-agri-science-results


belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "*research_prod*" `
    --output control-comparison-12-science-results