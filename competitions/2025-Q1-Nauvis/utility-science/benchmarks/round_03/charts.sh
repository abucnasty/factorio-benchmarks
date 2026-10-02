# initial ticks to remove
ticks_trim="60"
# total number of ticks for timeseries charts
ticks_total="36000"
# results folder
results_folder="results"
# output folder
output_folder="charts"
# aggregation strategy
aggregate_strategy="average"


####################
# all save files
####################
####################
# all save files
####################
belt-charts boxplot "$results_folder/utility_science_*.csv" \
  -w 1200 \
  -h 800 \
  --scale 2 \
  --remove-first-ticks $ticks_trim \
  -o "$output_folder/all/run_distribution.png" \
  --title-override "Round 03 All Designs: Run Distribution (480 Belts, 72k ticks, 3 runs each)" \
  --trim-prefix "utility_science_"

belt-charts summary "$results_folder/utility_science_*.csv" \
    -w 1000 \
    -h 800 \
    --scale 2 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/all/metrics.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Round 03 Average Update Time (480 Belts, 72k ticks, 3 runs each)" \
    --group-by "q1,q2,q3,q5" \
    --summary-table false

belt-charts ups "$results_folder/utility_science_*.csv" \
    --scale 2 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/all/ups.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --title-override "Round 03 Average UPS (480 Belts, 72k ticks, 3 runs each)" \
    --summary-table false \
    --value-labels

belt-charts entity-summary "$results_folder/utility_science_*.csv" \
    --scale 2 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/all/entity_metrics.png" \
    --aggregate-file "$results_folder/results.csv" \
    --group-by "q1,q2,q3,q5" \
    --top-n 5 \
    --trim-prefix "utility_science_" \
    --title-override "Round 03 Entity Update Times (480 Belts, 72k ticks, 3 runs each)" \
    --summary-table false

####################
# Q1 save files
####################

belt-charts boxplot "$results_folder/utility_science_*q1*.csv" \
  -w 1200 \
  -h 800 \
  --scale 2 \
  --remove-first-ticks $ticks_trim \
  -o "$output_folder/Q1/run_distribution.png" \
  --title-override "Round 03 Q1 Designs: Run Distribution (480 Belts, 72k ticks, 3 runs each)" \
  --trim-prefix "utility_science_"

belt-charts summary "$results_folder/utility_science_*q1*.csv" \
    -w 1000 \
    -h 800 \
    --scale 2 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/Q1/metrics.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Round 03 Q1 Designs: Average Update Time (480 Belts, 72k ticks, 3 runs each)" \
    --summary-table false

belt-charts entity-summary "$results_folder/utility_science_*q1*.csv" \
    --scale 2 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/Q1/entity_metrics.png" \
    --aggregate-file "$results_folder/results.csv" \
    --top-n 10 \
    --title-override "Round 03 Q1 Designs: Entity Update Times (480 Belts, 72k ticks, 3 runs each)" \
    --trim-prefix "utility_science_"

belt-charts core-freq-heatmap "$results_folder/cpu_freq.csv" \
  -w 1600 \
  -h 1000 \
  --scale 2 \
  -o "$output_folder/all/core_freq_heatmap.png" \
  -a $aggregate_strategy \
  --normalize global \
  --show-values true

####################
# Q2 save files
####################

belt-charts boxplot "$results_folder/utility_science_*q2*.csv" \
  -w 1200 \
  -h 800 \
  --scale 2 \
  --remove-first-ticks $ticks_trim \
  -o "$output_folder/Q2/run_distribution.png" \
  --title-override "Round 03 Q2 Designs: Run Distribution (480 Belts, 72k ticks, 3 runs each)" \
  --trim-prefix "utility_science_"

belt-charts summary "$results_folder/utility_science_*q2*.csv" \
    -w 1000 \
    -h 800 \
    --scale 2 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/Q2/metrics.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Round 03 Q2 Designs: Average Update Time (480 Belts, 72k ticks, 3 runs each)" \
    --summary-table false

belt-charts entity-summary "$results_folder/utility_science_*q2*.csv" \
    --remove-first-ticks $ticks_trim \
    --scale 2 \
    -o "$output_folder/Q2/entity_metrics.png" \
    --aggregate-file "$results_folder/results.csv" \
    --top-n 10 \
    --title-override "Round 03 Q2 Designs: Entity Update Times (480 Belts, 72k ticks, 3 runs each)" \
    --trim-prefix "utility_science_"


# timeseries charts
belt-charts bar "$results_folder/utility_science_*.csv" \
    -w 1400 \
    -h 800 \
    --scale 2 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/timeseries/timeseries.png" \
    -a "average" \
    --trim-prefix "utility_science_" \
    --max-ticks 72000 \
    --max-update 4000 \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --tick-window-aggregation 60


# baseline comparison
belt-charts entity-summary "$results_folder/utility_science_*baseline*.csv" \
    -w 800 \
    -h 600 \
    --scale 2 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/baseline/entity_metrics.png" \
    --aggregate-file "$results_folder/results.csv" \
    --top-n 10 \
    --title-override "Round 03 Utility Science Baseline Comparison Entity Update Time (480 Belts, 72k ticks, 3 runs each)" \
    --trim-prefix "utility_science_"

belt-charts summary "$results_folder/utility_science_*baseline*.csv" \
    -w 1000 \
    -h 600 \
    --scale 2 \
    --remove-first-ticks $ticks_trim \
    -o "$output_folder/baseline/metrics.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Round 03 Utility Science Baseline Comparison Update Time (480 Belts, 72k ticks, 3 runs each)" \
    --summary-table true