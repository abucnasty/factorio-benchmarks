baseline=baseline_q1_240

filtered_designs=(
  thaeln_q2_2880_railgun_tou_2
  thaeln_q2_2880_railgun_tou_1
  thaeln_q2_960
  thaeln_q2_960_railgun
  thaeln_q1_960
  atlan_q2_2880
  cy27_q1_480
  abuc_q1_480
  derantrix_q1_480
  mrx8024_q2_1440_v1
  theflyingcurryfish154_q1_1920
  stupidfathobbit_q1_240
  azhrei_q1
  swiftdeath_q1_2880
  dorrian_q1_480
  goirelandbrad_q1_480
  abuc_q2_480
  flexime_q1_480
  baseline_q1_240
  andymann_q1_240
  princle_2880_V2
  princle_2880_V1
  mcmayhem57_q1_960_max_prod
  crag_q1_2880
  thaeln_q3_960
  yuu_q5_480
)

filtered_designs=("${filtered_designs[@]}" "$baseline")

filtered_designs_glob=$(IFS=,; echo "${filtered_designs[*]}")

belt-charts boxplot "results/utility_science_*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 10 \
  -o "charts/run_distribution_all.png" \
  --trim-prefix "utility_science_"

belt-charts summary "results/utility_science_*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks 60 \
    -o "charts/metrics.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Average Update Time (36k ticks, 3 runs each)" \
    --summary-table false

belt-charts boxplot "results/utility_science_*q1*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 10 \
  -o "charts/run_distribution_q1.png" \
  --trim-prefix "utility_science_"

belt-charts summary "results/utility_science_*q1*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks 60 \
    -o "charts/metrics_q1.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Q1 Designs: Average Update Time (36k ticks, 3 runs each)" \
    --summary-table false

belt-charts boxplot "results/utility_science_*q2*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 10 \
  -o "charts/run_distribution_q2.png" \
  --trim-prefix "utility_science_"

belt-charts summary "results/utility_science_*q2*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks 60 \
    -o "charts/metrics_q2.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Q2 Designs: Average Update Time (36k ticks, 3 runs each)" \
    --summary-table false

belt-charts boxplot "results/utility_science_{${filtered_designs_glob}}*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 10 \
  -o "charts/run_distribution_filtered_designs.png" \
  --trim-prefix "utility_science_"

belt-charts summary "results/utility_science_{${filtered_designs_glob}}*.csv" \
    -w 1000 \
    -h 800 \
    --remove-first-ticks 60 \
    -o "charts/metrics_filtered_designs.png" \
    --aggregate-strategy "average" \
    --trim-prefix "utility_science_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,particleUpdate" \
    --title-override "Above Baseline Designs: Average Update Time (36k ticks, 3 runs each)" \
    --summary-table false

belt-charts bar "results/utility_science_*.csv" \
    -w 1400 \
    -h 800 \
    --remove-first-ticks 1 \
    -o "charts/timeseries.png" \
    -a "average" \
    --max-ticks 36000 \
    --max-update 600 \
    --tick-window-aggregation 60

# belt-charts summary "results/utility_science_*.csv" \
#     -w 1000 \
#     -h 800 \
#     --remove-first-ticks 60 \
#     -o "charts/metrics_multithreaded.png" \
#     --aggregate-strategy "average" \
#     --trim-prefix "utility_science_" \
#     --metrics "fluidFlowUpdate,electricNetworkUpdate" \
#     --title-override "Multithreaded Update Times (36k ticks, 3 runs each)" \
#     --summary-table false