###################################
# thaeln saves
###################################

belt-charts summary "results_thaeln/utility_science_*q1*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_q1.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_thaeln_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Q1 Saves (36k ticks, 1 run each)" \
    --summary-table true

belt-charts summary "results_thaeln/utility_science_*q2*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_q2.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_thaeln_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Q2 Saves (36k ticks, 1 run each)" \
    --summary-table true


belt-charts summary "results_thaeln/utility_science_*q1*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_q1_fluid_flow.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_thaeln_" \
    --metrics "fluidFlowUpdate" \
    --title-override "Q1 Fluid Flow (36k ticks, 1 run each)" \
    --summary-table true

belt-charts summary "results_thaeln/utility_science_*q2*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_q2_fluid_flow.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_thaeln_" \
    --metrics "fluidFlowUpdate" \
    --title-override "Q2 Fluid Flow (36k ticks, 1 run each)" \
    --summary-table true


belt-charts summary "results_thaeln/utility_science_*q1*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_q1_electric_network.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_thaeln_" \
    --metrics "electricNetworkUpdate" \
    --title-override "Q1 Electric Network (36k ticks, 1 run each)" \
    --summary-table true

belt-charts summary "results_thaeln/utility_science_*q2*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_q2_electric_network.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_thaeln_" \
    --metrics "electricNetworkUpdate" \
    --title-override "Q2 Electric Network (36k ticks, 1 run each)" \
    --summary-table true


###################################
# baseline saves
###################################


belt-charts summary "results_baseline/utility_science_*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_baseline.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_baseline_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Baseline Q1 Saves (36k ticks, 1 run each)" \
    --summary-table true


belt-charts summary "results_baseline/utility_science_*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_baseline_fluid_flow.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_baseline_" \
    --metrics "fluidFlowUpdate" \
    --title-override "Baseline Fluid Flow (36k ticks, 1 run each)" \
    --summary-table true

belt-charts summary "results_baseline/utility_science_*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/metrics_baseline_electric_network.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_baseline_" \
    --metrics "electricNetworkUpdate" \
    --title-override "Baseline Electric Network (36k ticks, 1 run each)" \
    --summary-table true