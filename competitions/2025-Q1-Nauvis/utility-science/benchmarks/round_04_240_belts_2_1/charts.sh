# belt-charts boxplot "results/utility_science_*.csv" \
#   -w 1200 \
#   -h 800 \
#   --remove-first-ticks 1 \
#   -o "charts/run_distribution_all.png" \
#   --trim-prefix "utility_science_" \
#   --min-update 0

# belt-charts summary "results/utility_science_*q1*.csv" \
#     -w 1200 \
#     -h 800 \
#     --remove-first-ticks 1 \
#     -o "charts/metrics_q1.png" \
#     --aggregate-strategy "average" \
#     --trim-prefix "utility_science_" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
#     --title-override "Q1 Saves 240 Belts (72k ticks, 3 runs each)" \
#     --summary-table false

# belt-charts summary "results/utility_science_*q2*.csv" \
#     -w 1200 \
#     -h 800 \
#     --remove-first-ticks 1 \
#     -o "charts/metrics_q2.png" \
#     --aggregate-strategy "average" \
#     --trim-prefix "utility_science_" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
#     --title-override "Q2 Saves 240 Belts (72k ticks, 3 runs each)" \
#     --summary-table false

# belt-charts summary "results/utility_science_*.csv" \
#     -w 1200 \
#     -h 800 \
#     --remove-first-ticks 1 \
#     -o "charts/metrics_all.png" \
#     --aggregate-strategy "average" \
#     --trim-prefix "utility_science_" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
#     --title-override "All Saves 240 Belts (72k ticks, 3 runs each)" \
#     --summary-table false

belt-charts summary "results/utility_science_thaeln_q2_v*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_all.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --summary-table false

belt-charts table "results/utility_science_*.csv" \
--remove-first-ticks 1 \
-o "aggregate.csv" \
--aggregate-strategy "average" \
--metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"