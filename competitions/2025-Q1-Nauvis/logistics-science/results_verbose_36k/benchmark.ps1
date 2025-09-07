param (
    # number of ticks to run per save file
    [int]$ticks = 36000,
    # number of runs
    [int]$runs = 10
)
 belt benchmark ../maps_2 `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../../../scripts/results.md.hbs `
    --pattern "design_*" `
    --output . `
    --strip-prefix "design_" `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"

chart-gen "design_*.csv" -w 2500 -h 800 --type summary --remove-first-ticks 60 -o "verbose_metrics_average_per_tick.png" -a "average"
chart-gen "design_*.csv" -w 1400 -h 1000 --type "bar" --remove-first-ticks 240 -o "timeseries.png" -a "average" --max-ticks 480  --max-update 4.5