category_any="00,01,03,04,05,08,09,14,15,17,18,20,21,22,23,24,25,26"
category_100="16,02,06,19,28"
category_600="07,10,13,29,31"
category_200="11,27"
category_all="[0-9][0-9]"

trains="13,30,31"

# belt-charts summary "results/{$category_any}*.csv" \
#     -w 1000 \
#     -h 700 \
#     --remove-first-ticks 60 \
#     -o "charts/metrics_any.png" \
#     --aggregate-strategy "average" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
#     --summary-table false

# belt-charts summary "results/{$category_100}*.csv" \
#     -w 1000 \
#     -h 250 \
#     --remove-first-ticks 60 \
#     -o "charts/metrics_100.png" \
#     --aggregate-strategy "average" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
#     --summary-table false

# belt-charts summary "results/{$category_any,$category_100}*.csv" \
#     -w 1000 \
#     -h 800 \
#     --remove-first-ticks 60 \
#     -o "charts/metrics_any_plus_100.png" \
#     --aggregate-strategy "average" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
#     --summary-table false


# belt-charts summary "results/{$category_200}*.csv" \
#     -w 1000 \
#     -h 800 \
#     --remove-first-ticks 60 \
#     -o "charts/metrics_200.png" \
#     --aggregate-strategy "average" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
#     --summary-table false

# belt-charts summary "results/{$category_600}*.csv" \
#     -w 1000 \
#     -h 800 \
#     --remove-first-ticks 60 \
#     -o "charts/metrics_600.png" \
#     --aggregate-strategy "average" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
#     --summary-table false

# belt-charts summary "results/{$category_600,$category_200}*.csv" \
#     -w 1000 \
#     -h 350 \
#     --remove-first-ticks 60 \
#     -o "charts/metrics_200_plus.png" \
#     --aggregate-strategy "average" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
#     --summary-table false

# belt-charts summary "results/$category_all*.csv" \
#     -w 1000 \
#     -h 1000 \
#     --remove-first-ticks 60 \
#     -o "charts/metrics_all_designs.png" \
#     --aggregate-strategy "average" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
#     --summary-table false

belt-charts summary "results/{$trains}*.csv" \
    -w 1000 \
    -h 600 \
    --remove-first-ticks 60 \
    -o "charts/metrics_all_trains.png" \
    --aggregate-strategy "average" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains" \
    --summary-table trains

# belt-charts boxplot "results/$category_all*.csv" \
#     -w 1000 \
#     -h 800 \
#     --remove-first-ticks 240 \
#     -o "charts/run_distribution_all.png"

# belt-charts bar "results/$category_all*.csv" \
#     -w 1400 \
#     -h 800 \
#     --remove-first-ticks 9 \
#     -o "charts/timeseries.png" \
#     -a "average" \
#     --max-ticks 3600 \
#     --max-update 6 \
#     --tick-window-aggregation 1
