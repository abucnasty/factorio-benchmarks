belt benchmark . `
    --ticks 64000 `
    --runs 10 `
    --template-path ../../../scripts/results-template.md.hbs `
    --pattern "*" `
    --output results_64000 `
    --strip-prefix "benchmark_" `
    --verbose-metrics "wholeUpdate"

belt benchmark . `
    --ticks 3600 `
    --runs 5 `
    --template-path ../../../scripts/results-template.md.hbs `
    --pattern "*" `
    --output results_3600 `
    --strip-prefix "benchmark_" `
    --verbose-metrics "wholeUpdate,transportLinesUpdate,controlBehaviorUpdate,entityUpdate"