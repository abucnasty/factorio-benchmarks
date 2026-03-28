export NODE_OPTIONS="--max-old-space-size=8192"

# belt-charts boxplot "results_three_hour/space_science_Q3*.csv" \
#   -w 1200 \
#   -h 800 \
#   --remove-first-ticks 30 \
#   -o "charts/summary_run_distribution_q3.png" \
#   --trim-prefix "space_science_Q3_2560SPS_"

# belt-charts summary "results_three_hour/space_science_Q3*.csv" \
#   -w 1500 \
#   -h 800 \
#   --remove-first-ticks 30 \
#   -o "charts/summary_q3.png" \
#   --aggregate-strategy average \
#   --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,spacePlatforms" \
#   --summary-table true \
#   --trim-prefix "space_science_Q3_2560SPS_" \
#   --summary-table-file true \
#   --title-override "Space Science Q3 Verbose Metrics"

# belt-charts boxplot "results_three_hour/space_science_Q5*.csv" \
#   -w 1200 \
#   -h 800 \
#   --remove-first-ticks 30 \
#   -o "charts/summary_run_distribution_q5.png" \
#   --trim-prefix "space_science_Q5_1280SPS_"

# belt-charts summary "results_three_hour/space_science_Q5*.csv" \
#   -w 1500 \
#   -h 800 \
#   --remove-first-ticks 30 \
#   -o "charts/summary_q5.png" \
#   --aggregate-strategy average \
#   --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,spacePlatforms" \
#   --summary-table true \
#   --trim-prefix "space_science_Q5_1280SPS_" \
#   --summary-table-file true \
#   --title-override "Space Science Q5 Verbose Metrics"


# best designs in each quality at 1920/s are: Q3_2560SPS_Jesse_MK2,Q5_1280SPS_Walt_MK4,Q2_3840SPS_Saul,Q1_7680SPS_Heisenberg_MK2,Q4_1920SPS_Skylar
belt-charts summary "results_three_hour/space_science_{Q3_2560SPS_Jesse_MK2,Q5_1280SPS_Walt_MK4,Q2_3840SPS_Saul,Q1_7680SPS_Heisenberg_MK2,Q4_1920SPS_Skylar}*.csv" \
  -w 1500 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/summary_best_designs.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,spacePlatforms" \
  --summary-table true \
  --trim-prefix "space_science_" \
  --summary-table-file true \
  --title-override "Quality Comparison Summary of Best Designs at 1920/s"