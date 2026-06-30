# initial ticks to remove
ticks_trim="1"
# total number of ticks for timeseries charts
ticks_total="1600"


belt-charts boxplot "results/DI_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --trim-prefix "DI_" \
    -o "charts/run_distribution.png" \
    --min-update 0

belt-charts summary "results/DI_*.csv" \
    -w 1400 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
    --trim-prefix "DI_" \
    --title-override "Splitter Miners Benchmark (1600 Ticks, 6 Runs)" \
    --summary-table true


belt-charts bar "results/DI_*.csv" \
    -w 1400 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    -o "charts/timeseries.png" \
    -a "average" \
    --max-ticks $ticks_total \
    --max-update 2500 \
    --trim-prefix "DI_" \
    --tick-window-aggregation 1