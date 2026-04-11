belt-charts boxplot "results/bm_*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1800 \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
    -o "charts/run_distribution_thaeln_cars.png" \
    --trim-prefix "bm_prod_mod_" \
    --max-update 0.7 \
    --min-update 0.5


belt-charts summary "results/bm_*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1800 \
    -o "charts/metrics.png" \
    --aggregate-strategy "average" \
    --trim-prefix "bm_prod_mod_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
    --summary-table-file true