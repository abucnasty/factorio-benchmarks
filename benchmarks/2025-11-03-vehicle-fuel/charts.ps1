belt-charts "results/bm_7_tiles*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 1 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_all.png" `
    --trim-prefix "bm_7_tiles_"

belt-charts "results/bm_7_tiles*.csv" `
    -w 1300 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_all_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_7_tiles_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/bm_7_tiles_tank*.csv" `
    -w 1300 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_tanks_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_7_tiles_tank_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/bm_7_tiles_car*.csv" `
    -w 1300 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_cars_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_7_tiles_car_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/bm_7_tiles*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 1 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_7_tiles_" `
    -a "average" `
    --max-ticks 240 `
    --max-update 6 `
    --tick-window-aggregation 1