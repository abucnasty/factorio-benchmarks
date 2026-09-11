# initial ticks to remove
ticks_trim="120"
# total number of ticks for timeseries charts
ticks_total="3600"
# results folder
results_folder="results"
# output folder
output_folder="charts"
# aggregation strategy
aggregate_strategy="average"
# standard deviation filter of runs
stdev_filter="1"
# prefix
prefix="collector_"

belt-charts boxplot "$results_folder/$prefix*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --trim-prefix "$prefix" \
    --stddev-filter "$stdev_filter" \
    --aggregate-file "$results_folder/results.csv" \
    -o "$output_folder/run_distribution.png"

belt-charts summary "$results_folder/$prefix*.csv" \
    -w 1200 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/metrics.png" \
    --aggregate-strategy "$aggregate_strategy" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,particleUpdate,turretTargetAcquisition,spacePlatforms" \
    --trim-prefix "$prefix" \
    --title-override "Collector Placement (3600 Ticks, 30 Runs)" \
    --summary-table true


belt-charts bar "$results_folder/$prefix*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,particleUpdate,turretTargetAcquisition,spacePlatforms" \
    -o "$output_folder/timeseries.png" \
    -a "$aggregate_strategy" \
    --max-ticks $ticks_total \
    --max-update 5000 \
    --trim-prefix "$prefix" \
    --tick-window-aggregation 1

belt-charts bar "$results_folder/$prefix*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    --metrics "spacePlatforms" \
    -o "$output_folder/timeseries_only_spaceplatform.png" \
    -a "$aggregate_strategy" \
    --max-ticks $ticks_total \
    --max-update 1000 \
    --trim-prefix "$prefix" \
    --tick-window-aggregation 1

belt-charts entity-summary "$results_folder/$prefix*.csv" \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/entity_summary.png" \
    --top-n 10 \
    --trim-prefix "$prefix"

belt-charts entity-summary-per-run "$results_folder/$prefix*.csv" \
    -w 2000 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/entity_summary_per_run.png" \
    --top-n 2 \
    --sort-by run \
    --trim-substring "_300t_later" \
    --trim-prefix "$prefix" \
    --summary-table false

belt-charts entity-matrix "$results_folder/$prefix*.csv" \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/entity_matrix.png" \
    --top-n 4 \
    --trim-prefix "$prefix" \
    --trim-substring "_300t_later"