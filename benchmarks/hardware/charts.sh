belt-charts boxplot "results/dmb_*.csv" \
    -w 800 \
    -h 800 \
    --remove-first-ticks 60 \
    -o "charts/boxplot.png" \
    --trim-prefix "dmb_main_research_prod_" \
    --max-update 16 \
    --min-update 08

belt-charts summary "results/dmb_*.csv" \
    -w 1000 \
    -h 700 \
    --remove-first-ticks 60 \
    -o "charts/summary.png" \
    --aggregate-strategy "average" \
    --trim-prefix "dmb_main_research_prod_" \
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate,trains,spacePlatforms,constructionManagerUpdate,particleUpdate,chartUpdate,turretTargetAcquisition" \
    --summary-table true