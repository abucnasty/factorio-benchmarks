belt-charts boxplot "results/bm_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks 240 \
    --trim-prefix "bm_" \
    -o "charts/run_distribution.png"

belt-charts summary "results/bm_*landfill*.csv" \
    -w 1400 \
    -h 700 \
    --remove-first-ticks 60 \
    -o "charts/metrics_landfill.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,spacePlatforms" \
    --trim-prefix "bm_landfill_" \
    --title-override "Landfill Voiding Improvements" \
    --summary-table true


belt-charts bar "results/bm_*.csv" \
    -w 1400 \
    -h 800 \
    --remove-first-ticks 9 \
    -o "charts/timeseries.png" \
    -a "average" \
    --max-ticks 3600 \
    --max-update 6000 \
    --trim-prefix "bm_" \
    --tick-window-aggregation 1


belt-charts summary "results/{bm_recycler_wagon_1920,bm_landfill_wagon_480}*.csv" \
    -w 1100 \
    -h 700 \
    --remove-first-ticks 60 \
    -o "charts/metrics_landfill_comparison.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,spacePlatforms" \
    --trim-prefix "bm_" \
    --title-override "Stone vs Landfill Voiding" \
    --summary-table true
