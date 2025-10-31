belt-charts "results/bm_*.csv" `
    -w 1000 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 1 `
    --max-ticks 10 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_all.png" `
    --trim-prefix "bm_"

belt-charts "results/bm_*chest*.csv" `
    -w 1300 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_chests_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_" `
    --max-ticks 10 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table true

belt-charts "results/bm_*tank*.csv" `
    -w 1800 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_tank_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_tank_" `
    --max-ticks 10 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table true

belt-charts "results/bm_*wagon*.csv" `
    -w 1400 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_wagon_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_wagon_" `
    --max-ticks 10 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table true

belt-charts "results/bm_*car*.csv" `
    -w 2000 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_car_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_car_" `
    --max-ticks 10 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table true

belt-charts "results/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_all_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_" `
    --max-ticks 10 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/bm_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 1 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_" `
    -a "average" `
    --max-ticks 10 `
    --max-update 12 `
    --tick-window-aggregation 1

belt-charts "results/bm_car_5_input*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 1 `
    -o "charts/timeseries_ticks.png" `
    --trim-prefix "bm_" `
    -a "average" `
    --max-ticks 16 `
    --max-update 4 `
    --tick-window-aggregation 1

belt-charts "results/bm_*{car_5,wagon_8,tank_6,silo_18,wood}*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1 `
    -o "charts/summary_verbose_metrics_max_input_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_" `
    --max-ticks 10 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table true