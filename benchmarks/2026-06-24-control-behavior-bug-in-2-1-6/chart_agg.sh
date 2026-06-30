# Baseline workload sweep: aggregates only the original per-N result
# directories (results_016, results_064, ..., results_2056, results_096_one_network).
# Every later experiment lives in a directory prefixed with a letter
# (results_aslr_off, results_n*_threads, results_pin_*, results_single_*,
# results_mimalloc_hp_aslr_off), so the [0-9] character class excludes them.
belt-charts table "results_[0-9]*/loop_*.csv" \
--remove-first-ticks 1 \
-o "charts/aggregate.csv" \
--aggregate-strategy "average" \
--metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate"


belt-charts summary "results_[0-9]*/loop_*.csv" \
    --remove-first-ticks 1 \
    -o charts/metrics_all.png \
    -w 1000 \
    -h 800 \
    --trim-prefix "loop_" \
    --metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate" \
    --title-override "3600 Ticks 50 Runs Each" \
    --summary-table false

belt-charts boxplot "results_[0-9]*/loop_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks 1 \
    --trim-prefix "loop_" \
    -o "charts/run_distribution.png" \
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