param (
    # number of ticks to run per save file
    [int]$ticks = 36000,
    # number of runs
    [int]$runs = 10
)
 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order grouped `
    --template-path ../../../../scripts/results.md.hbs `
    --pattern "design_36*" `
    --output . `
    --strip-prefix "design_" `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"

chart-gen "design_*.csv" -w 1650 -h 800 --type "summary" --remove-first-ticks 240 -o "verbose_metrics_summary.png" -a "average" --trim-prefix "design_"
chart-gen "design_*belt*.csv" -w 1400 -h 800 --type "summary" --remove-first-ticks 240 -o "verbose_metrics_belts_summary.png" -a "average"
chart-gen "design_*.csv" -w 2500 -h 800 --type "bar"     --remove-first-ticks 240 -o "timeseries.png" -a "average" --max-ticks 720  --max-update 4.5