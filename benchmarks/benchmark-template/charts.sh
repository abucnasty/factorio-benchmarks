# initial ticks to remove
ticks_trim="60"
# total number of ticks for timeseries charts
ticks_total="3600"


belt-charts boxplot "results/bm_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --trim-prefix "bm_" \
    -o "charts/run_distribution.png"

belt-charts summary "results/bm_*.csv" \
    -w 1400 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,spacePlatforms" \
    --trim-prefix "bm_" \
    --summary-table true


belt-charts bar "results/bm_*.csv" \
    -w 1400 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    -o "charts/timeseries.png" \
    -a "average" \
    --max-ticks $ticks_total \
    --max-update 10000 \
    --trim-prefix "bm_" \
    --tick-window-aggregation 1