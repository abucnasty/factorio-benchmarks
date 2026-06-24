prefix=$1


belt-charts table "results_${prefix}/loop_*.csv" \
--remove-first-ticks 1 \
-o "results_${prefix}/aggregate.csv" \
--aggregate-strategy "average" \
--metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"


belt-charts summary "results_${prefix}/loop_*.csv" \
    --remove-first-ticks 1 \
    -o results_${prefix}/charts/metrics_all.png \
    -w 1000 \
    -h 800 \
    --trim-prefix "loop_" \
    --metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate" \
    --title-override "3600 Ticks 50 Runs Each" \
    --summary-table false

belt-charts boxplot "results_${prefix}/loop_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks 1 \
    --trim-prefix "loop_" \
    -o "results_${prefix}/charts/run_distribution.png" \
    --min-update 0