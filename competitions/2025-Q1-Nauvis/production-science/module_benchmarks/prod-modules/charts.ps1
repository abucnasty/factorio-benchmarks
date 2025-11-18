belt-charts "results_24/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 1800 `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    -o "charts/summary_run_distribution_all_1_sigma.png" `
    --trim-prefix "bm_prod_mod_" `
    --aggregate-file "results_24/results.csv" `
    --stddev-filter 1 `
    --max-update 1.6 `
    --min-update 0.9

belt-charts "results_24/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 1800 `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    -o "charts/summary_run_distribution_all_2_sigma.png" `
    --trim-prefix "bm_prod_mod_" `
    --aggregate-file "results_24/results.csv" `
    --stddev-filter 2 `
    --max-update 1.6 `
    --min-update 0.9

belt-charts "results_24/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 1800 `
    --aggregate-strategy "average" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    -o "charts/summary_run_distribution_all_raw.png" `
    --trim-prefix "bm_prod_mod_" `
    --aggregate-file "results_24/results.csv" `
    --max-update 1.6 `
    --min-update 0.9


belt-charts "results_24/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 1800 `
    -o "charts/summary_verbose_metrics_average_all_designs.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_prod_mod_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains" `
    --summary-table false `
    --summary-table-file true `
    --aggregate-file "results_24/results.csv" `
    --stddev-filter 2

belt-charts "results_24/bm_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 1800 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_prod_mod_" `
    -a "average" `
    --max-ticks 3600 `
    --max-update 3 `
    --tick-window-aggregation 1 `
    --aggregate-file "results_24/results.csv" `
    --stddev-filter 2