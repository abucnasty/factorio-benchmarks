belt-charts "results_linux_standalone_mimalloc_multi_run/dmb_*.csv" \
    -w 1200 \
    -h 800 \
    --type "boxplot" \
    --remove-first-ticks 60 \
    --aggregate-strategy "average" \
    -o "charts/run_boxplot.png" \
    --trim-prefix "dmb_main_research_prod_" \
    --max-update 15 \
    --min-update 13

belt-charts "results_agg/dmb_*.csv" \
    -w 1500 \
    -h 800 \
    --type "summary" \
    --remove-first-ticks 60 \
    -o "charts/summary.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate,chartUpdate,turretTargetAcquisition" \
    --summary-table true \
    --summary-table-file true

NODE_OPTIONS=--max-old-space-size=8192 \
belt-charts "results_agg/dmb_*.csv" \
    -w 1600 \
    -h 900 \
    --type "bar" \
    --remove-first-ticks 60 \
    -o "charts/timeseries.png" \
    --trim-prefix "dmb_main_research_prod_" \
    -a "average" \
    --max-ticks 216000 \
    --max-update 18.0 \
    --tick-window-aggregation 3600

NODE_OPTIONS=--max-old-space-size=4096 \
belt-charts "results_agg/dmb_*.csv" \
    -w 1600 \
    -h 900 \
    --type "bar" \
    --remove-first-ticks 108000 \
    -o "charts/timeseries_30_min.png" \
    --trim-prefix "dmb_main_research_prod_" \
    -a "average" \
    --max-ticks 216000 \
    --max-update 18.0 \
    --tick-window-aggregation 60