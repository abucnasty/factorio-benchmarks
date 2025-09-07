param (
    # number of ticks to run per save file
    [int]$ticks = 7200,
    # number of runs
    [int]$runs = 6,
    [string]$output_path = "."
)
 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order random `
    --template-path ../../../scripts/results.md.hbs `
    --pattern "inserters_*" `
    --output $output_path `
    --strip-prefix "inserters_" `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"

chart-gen "inserters_*.csv" `
    -w 1000 `
    -h 800 `
    --type summary `
    --remove-first-ticks 240 `
    -o "verbose_metrics_average_per_tick.png" `
    -a "average" `
    --trim-prefix "inserters_"

chart-gen "inserters_*.csv" `
    -w 1000 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 240 `
    -o "timeseries.png" `
    -a "average" `
    --max-ticks 480 `
    --max-update 14 `
    --trim-prefix "inserters_"