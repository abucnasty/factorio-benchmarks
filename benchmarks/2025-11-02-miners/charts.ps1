belt-charts "results/bm_1_lane_2_miners_efficiency*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 60 `
    --aggregate-strategy "minimum" `
    -o "charts/summary_run_distribution_all.png" `
    --trim-prefix "bm_1_lane_2_miners_efficiency_"

belt-charts "results/bm_1_lane_2_miners_efficiency*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_all_table.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "bm_1_lane_2_miners_efficiency_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table true

belt-charts "results/bm_1_lane_2_miners_efficiency*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 60 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_1_lane_2_miners_efficiency_" `
    -a "minimum" `
    --max-ticks 200 `
    --max-update 40 `
    --tick-window-aggregation 0