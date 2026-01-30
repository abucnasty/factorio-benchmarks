belt-charts "results_multi_run/dmb_*.csv" \
    -w 800 \
    -h 800 \
    --type "boxplot" \
    --remove-first-ticks 60 \
    --aggregate-strategy "average" \
    -o "charts/run_boxplot.png" \
    --trim-prefix "dmb_main_research_prod_" \
    --max-update 18 \
    --min-update 12

belt-charts "results_multi_run/dmb_*.csv" \
    -w 1200 \
    -h 800 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_multi_run.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate,chartUpdate,turretTargetAcquisition" \
    --summary-table false \
    --summary-table-file true

belt-charts "results_multi_run/dmb_*.csv" \
    -w 1200 \
    -h 600 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_multi_run_mt_only.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate" \
    --summary-table false \
    --summary-table-file true \
    --title-override "Multi-Threaded Update Time Averages"

belt-charts "results_multi_run/dmb_*.csv" \
    -w 1200 \
    -h 600 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_multi_run_control_behavior_only.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "controlBehaviorUpdate" \
    --summary-table false \
    --summary-table-file true \
    --title-override "Control Behavior Update Time Averages"

belt-charts "results_multi_run/dmb_*.csv" \
    -w 1200 \
    -h 600 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_multi_run_transport_lines_only.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "transportLinesUpdate" \
    --summary-table false \
    --summary-table-file true \
    --title-override "Transport Lines Update Time Averages"

belt-charts "results_multi_run/dmb_*.csv" \
    -w 1200 \
    -h 600 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_multi_run_electric_heat_fluid_circuit_only.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "electricHeatFluidCircuitUpdate" \
    --summary-table false \
    --summary-table-file true \
    --title-override "Electric Heat Fluid Circuit Update Time Averages"

belt-charts "results_multi_run/dmb_*.csv" \
    -w 1200 \
    -h 600 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_multi_run_entity_only.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "entityUpdate" \
    --summary-table false \
    --summary-table-file true \
    --title-override "Entity Update Time Averages"

belt-charts "results_multi_run/dmb_*linux*huge_pages*.csv" \
    -w 1000 \
    -h 600 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_multi_run_huge_pages_only.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_linux_standalone_mimalloc_huge_pages_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate,chartUpdate,turretTargetAcquisition" \
    --summary-table false \
    --summary-table-file true \
    --title-override "Total Huge Page Size (1GB pages) Available to Factorio"

belt-charts "results_multi_run/dmb_main_research_prod_{windows,linux}_standalone_verbose_metrics.csv" \
    -w 1200 \
    -h 600 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_linux_vs_windows.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate,chartUpdate,turretTargetAcquisition" \
    --summary-table true \
    --summary-table-file true \
    --title-override "Windows vs Linux Standalone Performance Comparison"

belt-charts "results_multi_run/dmb_main_research_prod_linux_{steam,standalone}_verbose_metrics.csv" \
    -w 1200 \
    -h 600 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_steam_vs_standalone.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate,chartUpdate,turretTargetAcquisition" \
    --summary-table true \
    --summary-table-file true \
    --title-override "Steam vs Standalone Performance Comparison (malloc)"

belt-charts "results_multi_run/dmb_main_research_prod_linux_{steam,standalone}_mimalloc_verbose_metrics.csv" \
    -w 1200 \
    -h 600 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_steam_vs_standalone_mimalloc.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate,chartUpdate,turretTargetAcquisition" \
    --summary-table true \
    --summary-table-file true \
    --title-override "Steam vs Standalone Performance Comparison (mimalloc)"

belt-charts "results_multi_run/dmb_main_research_prod_{windows,linux}_standalone_verbose_metrics.csv" \
    -w 900 \
    -h 300 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary_linux_vs_windows_entity_update.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "entityUpdate" \
    --summary-table true \
    --summary-table-file true \
    --title-override "Windows vs Linux Standalone Entity Update Time Comparison"

NODE_OPTIONS=--max-old-space-size=8192 \
belt-charts "results_multi_run/dmb_*.csv" \
    -w 1600 \
    -h 900 \
    --type "bar" \
    --remove-first-ticks 60 \
    -o "charts/timeseries.png" \
    --trim-prefix "dmb_main_research_prod_" \
    -a "average" \
    --max-ticks 18000 \
    --max-update 20.0 \
    --tick-window-aggregation 1