belt-charts "results/bm_*160_belted_abuc_3_furnace*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 7200 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_160_belted_abuc_3_furnace.png" `
    --trim-prefix "bm_furnaces_"

belt-charts "results/bm_*160_belted_abuc_3_furnace*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 7200 `
    -o "charts/summary_verbose_metrics_160_belted_abuc_3_furnace_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_furnaces_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table false `
    --summary-table-file true


belt-charts "results/bm_*40_belted_abuc*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 7200 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_40_belted_abuc.png" `
    --trim-prefix "bm_furnaces_"

belt-charts "results/bm_*40_belted_abuc*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 7200 `
    -o "charts/summary_verbose_metrics_40_belted_abuc_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_furnaces_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table false `
    --summary-table-file true


belt-charts "results/bm_*belted*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 7200 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_belted.png" `
    --trim-prefix "bm_furnaces_"

belt-charts "results/bm_*belted*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 7200 `
    -o "charts/summary_verbose_metrics_belted_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_furnaces_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table false `
    --summary-table-file true

belt-charts "results/bm_*on_patch*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 7200 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_on_patch.png" `
    --trim-prefix "bm_furnaces_"

belt-charts "results/bm_*on_patch*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 7200 `
    -o "charts/summary_verbose_metrics_on_patch_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_furnaces_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table false `
    --summary-table-file true


belt-charts "results/bm_*mirror*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 7200 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_mirror.png" `
    --trim-prefix "bm_furnaces_80_belted_warbaque_"

belt-charts "results/bm_*mirror*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 7200 `
    -o "charts/summary_verbose_metrics_mirror_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_furnaces_80_belted_warbaque_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table false `
    --summary-table-file true


belt-charts "results/bm_*.csv" `
    -w 1200 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 7200 `
    --aggregate-strategy "average" `
    -o "charts/summary_run_distribution_all.png" `
    --trim-prefix "bm_furnaces_"

belt-charts "results/bm_*.csv" `
    -w 1500 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 7200 `
    -o "charts/summary_verbose_metrics_all_table.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_furnaces_" `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table false `
    --summary-table-file true

belt-charts "results/bm_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 7200 `
    -o "charts/timeseries.png" `
    --trim-prefix "bm_furnaces_" `
    -a "average" `
    --max-ticks 8160 `
    --max-update 8 `
    --tick-window-aggregation 1