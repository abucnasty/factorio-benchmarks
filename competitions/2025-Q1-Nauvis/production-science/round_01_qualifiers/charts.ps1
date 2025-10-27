param (
    [string]$category_any_belted = "00,01,03,04,05,08,09,14,15,17,18,20,21,22,23,24,25,26",
    [string]$category_any_on_patch = "16,02,06,19,28",
    [string]$category_600 = "07,10,13,29",
    [string]$category_200 = "11,27",
    [string]$category_all = "[0-9][0-9]"
)

belt-charts "results/$category_all*.csv" `
    --type "table" `
    --remove-first-ticks 60 `
    -o "summary_verbose_metrics_table.csv" `
    -a "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains"

belt-charts "results/{$category_any_belted}*.csv" `
    -w 1000 `
    -h 700 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_any_belted.png" `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/{$category_any_on_patch}*.csv" `
    -w 1000 `
    -h 250 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_any_on_patch.png" `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/{$category_any_belted,$category_any_on_patch}*.csv" `
    -w 1000 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_any.png" `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/{$category_any_belted}*.csv" `
    -w 2500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_any_belted_table.png" `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table true


belt-charts "results/{$category_200}*.csv" `
    -w 1000 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_200_on_patch.png" `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/{$category_600}*.csv" `
    -w 1000 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_600_on_patch.png" `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/{$category_600,$category_200}*.csv" `
    -w 1000 `
    -h 350 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_200_plus.png" `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/$category_all*.csv" `
    -w 1000 `
    -h 1000 `
    --type "summary" `
    --remove-first-ticks 60 `
    -o "charts/summary_verbose_metrics_all_designs.png" `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false

belt-charts "results/$category_all*.csv" `
    -w 1000 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 240 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_all.png"

belt-charts "results/$category_all*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 9 `
    -o "charts/timeseries.png" `
    -a "average" `
    --max-ticks 3600 `
    --max-update 6 `
    --tick-window-aggregation 1