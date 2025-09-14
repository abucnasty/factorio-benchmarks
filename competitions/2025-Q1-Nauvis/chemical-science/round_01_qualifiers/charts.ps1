chart-gen "results_affinity_8/**/design_*.csv" `
    -w 1920 `
    -h 1200 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "charts_affinity_8/summary_verbose_metrics_all_designs.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table false


chart-gen "results_affinity_8/**/design_*.csv" `
    -w 1000 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 240 `
    --aggregate-strategy "average" `
    -o "charts_affinity_8/summary_run_distribution_all.png" `
    --trim-prefix "design_"


chart-gen "results_affinity_8/above_baseline/design_*.csv" `
    -w 1000 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 240 `
    --aggregate-strategy "average" `
    -o "charts_affinity_8/summary_run_distribution_above_baseline.png" `
    --trim-prefix "design_"


chart-gen "results_affinity_8/**/design_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 240 `
    -o "charts_affinity_8/timeseries_18k/timeseries.png" `
    -a "average" `
    --max-ticks 18000  `
    --max-update 3.5 `
    --tick-window-aggregation 60 `
    --trim-prefix "design_"


chart-gen "results_affinity_8/**/design_16*.csv" `
    -w 800 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "charts_affinity_8/design_16_ships_comparison.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table true

chart-gen "results_affinity_8/**/design_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 240 `
    -o "charts_affinity_8/timeseries_240/timeseries.png" `
    -a "average" `
    --max-ticks 480  `
    --max-update 3.5 `
    --tick-window-aggregation 0 `
    --trim-prefix "design_"

chart-gen "results_affinity_8/above_baseline/design_*.csv" `
    -w 1000 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "charts_affinity_8/summary_verbose_metrics_above_baseline.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table false

chart-gen "results_affinity_8/below_baseline/design_*.csv" `
    -w 1400 `
    -h 1200 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "charts_affinity_8/summary_verbose_metrics_below_baseline.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table true

chart-gen "results_affinity_8/with_space_platforms/design_*.csv" `
    -w 1000 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "charts_affinity_8/design_16_with_ships_to_baseline.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table true

chart-gen "results_affinity_8/**/design_{00,16}*.csv" `
    -w 1000 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "charts_affinity_8/design_16.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table true


chart-gen "results_affinity_8/below_baseline/design_*.csv" `
    -w 1400 `
    -h 1200 `
    --type "summary" `
    --remove-first-ticks 240 `
    -o "charts_affinity_8/summary_verbose_metrics_below_baseline.png" `
    --aggregate-strategy "average" `
    --trim-prefix "design_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms" `
    --summary-table true