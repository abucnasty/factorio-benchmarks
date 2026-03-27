export NODE_OPTIONS="--max-old-space-size=8192"

belt-charts summary "results/silo_{q3,q5}_verbose*metrics.csv" \
  --title-override "Q3 vs Q5 Silo Metrics" \
  -w 800 \
  -h 500 \
  --remove-first-ticks 30 \
  -o "charts/q3_vs_q5_silo_metrics.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate" \
  --summary-table true \
  --trim-prefix "silo_" \
  --summary-table-file true

belt-charts summary "results/silo_q5_beacon_[0-9][0-9]_verbose*.csv" \
  --title-override "Beacon Comparison" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/beacon_comparison_summary.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate" \
  --summary-table true \
  --trim-prefix "silo_q5_beacon_" \
  --summary-table-file true

belt-charts summary "results/silo_q5_beacon*.csv" \
  --title-override "Beacon Comparison with Empty Beacons" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/beacon_comparison_with_empty_beacons_summary.png" \
  --aggregate-strategy average \
  --metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate" \
  --summary-table true \
  --trim-prefix "silo_q5_beacon_" \
  --summary-table-file true

belt-charts summary "results/silo_q5_beacon_[0-9][0-9]_verbose*.csv" \
  --title-override "Electric Network Update" \
  -w 1500 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/electric_network_update.png" \
  --aggregate-strategy average \
  --metrics "electricNetworkUpdate" \
  --summary-table true \
  --trim-prefix "silo_" \
  --summary-table-file true

belt-charts boxplot "results/silo*.csv" \
  -w 1200 \
  -h 800 \
  --remove-first-ticks 30 \
  -o "charts/summary_run_distribution_all.png" \
  --trim-prefix "silo_"
