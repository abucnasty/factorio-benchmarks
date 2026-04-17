belt-charts boxplot "results/dmb_main_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks 240 \
    --trim-prefix "dmb_main_" \
    -o "charts/run_distribution.png"

belt-charts summary "results/dmb_main_*.csv" \
    -w 1400 \
    -h 700 \
    --remove-first-ticks 240 \
    -o "charts/metrics.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,spacePlatforms" \
    --trim-prefix "dmb_main_" \
    --title-override "Landfill Voiding Improvements" \
    --summary-table true


belt-charts bar "results/dmb_main_*.csv" \
    -w 1400 \
    -h 800 \
    --remove-first-ticks 9 \
    -o "charts/timeseries.png" \
    -a "average" \
    --max-ticks 108000 \
    --max-update 10000 \
    --trim-prefix "dmb_main_" \
    --tick-window-aggregation 60