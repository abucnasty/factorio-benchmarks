# initial ticks to remove
ticks_trim="60"
# total number of ticks for timeseries charts
ticks_total="7200"


belt-charts boxplot "results/bm_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --trim-prefix "bm_" \
    -o "charts/run_distribution.png" \
    --min-update 0

belt-charts summary "results/bm_*.csv" \
    -w 1400 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,particleUpdate" \
    --trim-prefix "bm_" \
    --title-override "Average Metrics (7200 Ticks, 3 Runs)" \
    --summary-table true


belt-charts entity-summary "results/bm_*.csv" \
    --remove-first-ticks $ticks_trim \
    -o "charts/entity_summary.png" \
    --top-n 4 \
    --trim-prefix "bm_"


belt-charts entity-matrix "results/bm_*.csv" \
    --remove-first-ticks $ticks_trim \
    -o "charts/entity_matrix.png" \
    --top-n 20 \
    --min-percent 10 \
    --trim-prefix "bm_"


# landfill charts

belt-charts boxplot "results/bm_*landfill*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --trim-prefix "bm_" \
    -o "charts/run_distribution_landfill.png" \
    --min-update 0

belt-charts summary "results/bm_*landfill*.csv" \
    -w 1400 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "charts/metrics_landfill.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,particleUpdate" \
    --trim-prefix "bm_" \
    --title-override "Average Metrics (7200 Ticks, 3 Runs)" \
    --summary-table true

belt-charts entity-summary "results/bm_*landfill*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    -o "charts/entity_summary_landfill.png" \
    --top-n 4 \
    --trim-prefix "bm_"