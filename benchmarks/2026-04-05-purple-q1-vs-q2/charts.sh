belt-charts boxplot "results/dmb_*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/run_distribution.png" \
  --max-update 6 \
  --min-update 0 \
  --trim-prefix "dmb_purple_"

belt-charts summary "results/dmb_*idle*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/summary_idle.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
  --summary-table true \
  --summary-table-file true \
  --title-override "Idle Save Files" \
  --trim-prefix "dmb_purple_"


belt-charts summary "results/dmb_*q1*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/summary_q1.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
  --summary-table true \
  --summary-table-file true \
  --title-override "Q1 Save Files" \
  --trim-prefix "dmb_purple_"

belt-charts summary "results/dmb_*q2*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/summary_q2.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
  --summary-table true \
  --summary-table-file true \
  --title-override "Q2 Save Files" \
  --trim-prefix "dmb_purple_"

belt-charts summary "results/dmb_*mining_prod*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/summary_mining_prod.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
  --summary-table true \
  --summary-table-file true \
  --title-override "3840 SPS Mining Prod Comparison" \
  --trim-prefix "dmb_purple_"

belt-charts summary "results/dmb_*worker_robot_speed*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/summary_worker_robot_speed.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
  --summary-table true \
  --summary-table-file true \
  --title-override "3840 SPS Worker Robot Speed Comparison" \
  --trim-prefix "dmb_purple_"

belt-charts bar "results/dmb_*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/timeseries.png" \
  -a "average" \
  --max-ticks 72000 \
  --max-update 6000 \
  --tick-window-aggregation 60 \
  --trim-prefix "dmb_purple_"
