category_all="[0-9][0-9]"

# Run Distribution
belt-charts boxplot "results/${category_all}_*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1800 \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
    -o "charts/run_distribution.png" \
    --aggregate-file "results/results.csv" \
    --max-update 2.0 \
    --min-update 0.0

# Metric Summary Distribution
belt-charts summary "results/${category_all}_*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1800 \
    -o "charts/metric_summary.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
    --summary-table true \
    --summary-table-file true

# Metric Summary Distribution
belt-charts summary "results/*composite*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1800 \
    -o "charts/metric_summary_composites.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
    --summary-table true \
    --summary-table-file true

belt-charts bar "results/${category_all}_*.csv" \
    -w 1400 \
    -h 800 \
    --remove-first-ticks 1800 \
    -o "charts/timeseries.png" \
    -a "average" \
    --max-ticks 3600 \
    --max-update 2000 \
    --tick-window-aggregation 5