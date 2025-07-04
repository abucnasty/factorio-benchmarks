param (
    # number of ticks to run per save file
    [int]$ticks = 10000,
    # number of runs
    [int]$runs = 5
)

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "labs_mining_prod*" `
    --output control-comparison-4-science-results

belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "labs_bot_speed*" `
    --output control-comparison-7-science-results


belt benchmark . `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results-template.md.hbs `
    --pattern "labs_research_prod*" `
    --output control-comparison-12-science-results

# belt benchmark . `
#     --ticks $ticks `
#     --runs $runs `
#     --run-order sequential `
#     --template-path ../../scripts/results-template.md.hbs `
#     --pattern "quality_*_mining_prod" `
#     --output quality-science-4-science-results

# belt benchmark . `
#     --ticks $ticks `
#     --runs $runs `
#     --run-order sequential `
#     --template-path ../../scripts/results-template.md.hbs `
#     --pattern "quality_*_laser_weapon" `
#     --output quality-science-6-science-results

# belt benchmark . `
#     --ticks $ticks `
#     --runs $runs `
#     --run-order sequential `
#     --template-path ../../scripts/results-template.md.hbs `
#     --pattern "quality_*_bot_speed" `
#     --output quality-science-7-science-results

# belt benchmark . `
#     --ticks $ticks `
#     --runs $runs `
#     --run-order sequential `
#     --template-path ../../scripts/results-template.md.hbs `
#     --pattern "quality_*_research_prod" `
#     --output quality-science-12-science-results
