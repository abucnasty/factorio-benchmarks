# initial ticks to remove
ticks_trim="120"
# total number of ticks for timeseries charts
ticks_total="3600"
# results folder
results_folder="edge_removal_results"
# output folder
output_folder="edge_removal_charts"
# aggregation strategy
aggregate_strategy="average"
# standard deviation filter of runs
stdev_filter="2"

belt-charts boxplot "$results_folder/prom_collectors_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --trim-prefix "prom_collectors_" \
    --stddev-filter "$stdev_filter" \
    --aggregate-file "$results_folder/results.csv" \
    -o "$output_folder/run_distribution_${stdev_filter}_sigma_base_zero.png" \
    --min-update 0

belt-charts summary "$results_folder/prom_collectors_*.csv" \
    -w 1200 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/metrics.png" \
    --aggregate-strategy "$aggregate_strategy" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,particleUpdate,turretTargetAcquisition,spacePlatforms" \
    --trim-prefix "prom_collectors_" \
    --title-override "Promethium Ship Side Collector Test (3600 Ticks, 6 Runs)" \
    --stddev-filter "$stdev_filter" \
    --aggregate-file "$results_folder/results.csv" \
    --summary-table true


belt-charts bar "$results_folder/prom_collectors_*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,particleUpdate,turretTargetAcquisition,spacePlatforms" \
    -o "$output_folder/timeseries.png" \
    -a "$aggregate_strategy" \
    --max-ticks $ticks_total \
    --max-update 5000 \
    --trim-prefix "prom_collectors_" \
    --tick-window-aggregation 5

belt-charts entity-summary "$results_folder/prom_collectors_*.csv" \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/entity_summary.png" \
    --stddev-filter "$stdev_filter" \
    --aggregate-file "$results_folder/results.csv" \
    --top-n 10 \
    --trim-prefix "prom_collectors_"

belt-charts entity-summary-per-run "$results_folder/prom_collectors_*.csv" \
    -w 2000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/entity_summary_per_run.png" \
    --stddev-filter "$stdev_filter" \
    --aggregate-file "$results_folder/results.csv" \
    --top-n 2 \
    --sort-by run \
    --trim-substring "_355Mm" \
    --trim-prefix "prom_collectors_"

belt-charts entity-matrix "$results_folder/prom_collectors_*.csv" \
    -w 1200 \
    --remove-first-ticks $ticks_trim \
    --stddev-filter "$stdev_filter" \
    --aggregate-file "$results_folder/results.csv" \
    -o "$output_folder/entity_matrix.png" \
    --top-n 4 \
    --trim-prefix "prom_collectors_"