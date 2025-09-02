param (
    # number of ticks to run per save file
    [int]$ticks = 7200,
    # number of runs
    [int]$runs = 8
)

 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --template-path ../../scripts/results.md.hbs `
    --pattern "*" `
    --output results_boost_max_fans_random `
    --verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"

cd results_boost_max_fans_random
chart-gen "blue_*.csv" -w 800 -h 800 --type summary --remove-first-ticks 240 -o "verbose_metrics_average_per_tick.png" -a "minimum"
chart-gen "blue_*.csv" -w 1400 -h 1000 --type "bar" --remove-first-ticks 240 -o "timeseries.png" -a "average" --max-ticks 720  --max-update 4.5
cd ..