belt-charts table "**/loop_*.csv" \
--remove-first-ticks 1 \
-o "charts/aggregate.csv" \
--aggregate-strategy "average" \
--metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"


belt-charts summary "**/loop_*.csv" \
    --remove-first-ticks 1 \
    -o charts/metrics_all.svg \
    -w 1000 \
    -h 800 \
    --trim-prefix "loop_" \
    --metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate" \
    --title-override "3600 Ticks 50 Runs Each" \
    --summary-table false

belt-charts boxplot "**/loop_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks 1 \
    --trim-prefix "loop_" \
    -o "charts/run_distribution.svg" \
    --min-update 0


## 96 Copies Only

# belt-charts summary "**/loop_*096*.csv" \
#     --remove-first-ticks 1 \
#     -o charts/metrics_096.svg \
#     -w 1000 \
#     -h 800 \
#     --trim-prefix "loop_" \
#     --metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate" \
#     --title-override "3600 Ticks 50 Runs Each" \
#     --summary-table false

# belt-charts boxplot "**/loop_*096*.csv" \
#     -w 1000 \
#     -h 800 \
#     --remove-first-ticks 1 \
#     --trim-prefix "loop_" \
#     -o "charts/run_distribution_096.svg" \
#     --min-update 0