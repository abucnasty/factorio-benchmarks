belt-charts "results/bm_1_lane_2_miners_{quality_4000,efficiency_4000,prod_4000,speed_4000}*.csv" `
    -w 1600 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_temp.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "bm_1_lane_2_miners_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true


belt-charts "results/bm_1_lane_2_miners*quality_4000*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_quality_modules.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "bm_1_lane_2_miners_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true


belt-charts "results/bm_1_lane_2_miners*4_module*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_quality_4_module.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "bm_1_lane_2_miners_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true

belt-charts "results/bm_1_lane_2_miners*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_all_table.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "bm_1_lane_2_miners_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table false

belt-charts "results/bm_1_lane_2_miners_efficiency*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_efficiency_table.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "bm_1_lane_2_miners_efficiency_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
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


belt-charts "results/bm_1_lane_2_miners_quality*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_quality_table.png" `
    --aggregate-strategy "minimum" `
    --trim-prefix "bm_1_lane_2_miners_quality_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true

belt-charts "results/bm_1_lane_2_miners*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 60 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_1_lane_2_miners_" `
    -a "minimum" `
    --max-ticks 200 `
    --max-update 40 `
    --tick-window-aggregation 0