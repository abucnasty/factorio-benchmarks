# initial ticks to remove
ticks_trim="60"
# total number of ticks for timeseries charts
ticks_total="480"


belt-charts boxplot "results/bm_chest_to_belt_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --trim-prefix "bm_chest_to_belt_" \
    -o "charts/run_distribution_chest_to_belt.png" \
    --min-update 0

belt-charts summary "results/bm_chest_to_belt_*.csv" \
    -w 1000 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics_chest_to_belt.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
    --trim-prefix "bm_chest_to_belt_" \
    --title-override "Chest To Belt Metrics (480 Ticks, 6 Runs)" \
    --summary-table true

belt-charts bar "results/bm_chest_to_belt_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    -o "charts/timeseries_chest_to_belt.png" \
    -a "average" \
    --max-ticks $ticks_total \
    --max-update 8000 \
    --trim-prefix "bm_chest_to_belt_" \
    --tick-window-aggregation 1


belt-charts boxplot "results/bm_belt_to_chest_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --trim-prefix "bm_belt_to_chest_" \
    -o "charts/run_distribution_belt_to_chest.png" \
    --min-update 0

belt-charts summary "results/bm_belt_to_chest_*.csv" \
    -w 1000 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics_belt_to_chest.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
    --trim-prefix "bm_belt_to_chest_" \
    --title-override "Belt To Chest Metrics (480 Ticks, 6 Runs)" \
    --summary-table true

belt-charts bar "results/bm_belt_to_chest_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    -o "charts/timeseries_belt_to_chest.png" \
    -a "average" \
    --max-ticks $ticks_total \
    --max-update 8000 \
    --trim-prefix "bm_belt_to_chest_" \
    --tick-window-aggregation 1