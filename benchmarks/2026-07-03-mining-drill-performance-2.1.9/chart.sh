# initial ticks to remove
ticks_trim="60"
# total number of ticks for timeseries charts
ticks_total="1260"


belt-charts boxplot "results/bm_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --trim-prefix "bm_" \
    -o "charts/run_distribution.png" \
    --min-update 0 \
    --names-file ./save_file_name_map.txt

belt-charts summary "results/bm_*.csv" \
    -w 1000 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
    --trim-prefix "bm_" \
    --title-override "Mining Drill All Run Metrics (1260 Ticks, 6 Runs)" \
    --summary-table false \
    --names-file ./save_file_name_map.txt

belt-charts summary "results/bm_2_0_77_*.csv" \
    -w 1200 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics_2_0_77.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
    --trim-prefix "bm_2_0_77_" \
    --title-override "Mining Drill Metrics in 2.0.77 (1260 Ticks, 6 Runs)" \
    --summary-table false \
    --max-update 4000 \
    --title-case

belt-charts summary "results/bm_2_1_9_*.csv" \
    -w 1200 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics_2_1_9.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
    --trim-prefix "bm_2_1_9_" \
    --title-override "Mining Drill Metrics in 2.1.9 (1260 Ticks, 6 Runs)" \
    --summary-table false \
    --max-update 4000 \
    --title-case


belt-charts summary "results/bm_*4000*.csv" \
    -w 1200 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics_mining_prod_4000.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
    --trim-prefix "bm_" \
    --title-override "Mining Drill Metrics at Mining Prod 4000 (1260 Ticks, 6 Runs)" \
    --summary-table false \
    --names-file ./save_file_name_map.txt

belt-charts bar "results/bm_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    -o "charts/timeseries.png" \
    -a "average" \
    --max-ticks $ticks_total \
    --max-update 8000 \
    --trim-prefix "bm_" \
    --tick-window-aggregation 1