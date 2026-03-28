export NODE_OPTIONS="--max-old-space-size=8192"

belt-charts boxplot "results_lab_sim/space_science_lab_sim_*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/lab_sim/summary_run_distribution_all.png" \
  --trim-prefix "space_science_lab_sim_"

belt-charts summary "results_lab_sim/space_science_lab_sim_*.csv" \
  -w 1500 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/lab_sim/summary.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,spacePlatforms" \
  --summary-table true \
  --trim-prefix "space_science_lab_sim_" \
  --summary-table-file true \
  --title-override "Space Science with Lab Inserter Sim - Average Update Time by Metric"

belt-charts bar "results_lab_sim/space_science_lab_sim_*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/lab_sim/timeseries.png" \
  -a "average" \
  --max-ticks 324000 \
  --max-update 500 \
  --trim-prefix "space_science_lab_sim_" \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,spacePlatforms" \
  --tick-window-aggregation 240
