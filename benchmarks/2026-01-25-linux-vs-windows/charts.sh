belt-charts "results_agg/dmb_*.csv" \
    -w 1500 \
    -h 800 \
    --type "summary" \
    --remove-first-ticks 420 \
    -o "charts/summary.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_research_prod_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate,chartUpdate,turretTargetAcquisition" \
    --summary-table true \
    --summary-table-file true

# belt-charts "results_agg/dmb_*.csv" \
#     -w 1600 \
#     -h 900 \
#     --type "bar" \
#     --remove-first-ticks 60 \
#     -o "charts/timeseries.png" \
#     --trim-prefix "dmb_" \
#     -a "average" \
#     --max-ticks 216000 \
#     --max-update 18.0 \
#     --tick-window-aggregation 3600

# belt-charts "results_agg/dmb_*.csv" \
#     -w 1600 \
#     -h 900 \
#     --type "bar" \
#     --remove-first-ticks 108000 \
#     -o "charts/timeseries_30_min.png" \
#     --trim-prefix "dmb_" \
#     -a "average" \
#     --max-ticks 216000 \
#     --max-update 18.0 \
#     --tick-window-aggregation 60