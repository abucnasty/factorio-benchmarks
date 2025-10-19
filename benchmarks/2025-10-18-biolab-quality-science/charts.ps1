belt-charts "results/bm_labs_*.csv" `
    -w 1000 `
    -h 800 `
    --type "boxplot" `
    --remove-first-ticks 2 `
    --max-ticks 3600 `
    --aggregate-strategy "average" `
    -o "results/summary_run_distribution_all.png" `
    --trim-prefix "bm_labs_"


belt-charts "results/bm_labs_q1*.csv" `
    -w 1200 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 2 `
    -o "results/summary_q1.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_labs_" `
    --max-ticks 3600 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true

belt-charts "results/bm_labs_q*mining_prod*.csv" `
    -w 1600 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 2 `
    -o "results/summary_mining_prod.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_labs_" `
    --max-ticks 3600 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true

belt-charts "results/bm_labs_q1*mining_prod*.csv" `
    -w 1400 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 2 `
    -o "results/summary_q1_mining_prod.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_labs_" `
    --max-ticks 3600 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true

belt-charts "results/bm_labs_q1_{mining_prod,research_prod,robo_speed,lasers,explosives,railgun,flammables}_verbose*.csv" `
    -w 1400 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 2 `
    -o "results/summary_q1_research_comparison.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_labs_" `
    --max-ticks 3600 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true

belt-charts "results/bm_labs_q*research_prod*.csv" `
    -w 1400 `
    -h 800 `
    --type "summary" `
    --remove-first-ticks 2 `
    -o "results/summary_research_prod.png" `
    --aggregate-strategy "average" `
    --trim-prefix "bm_labs_" `
    --max-ticks 3600 `
    --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,electricNetworkUpdate,fluidFlowUpdate,entityUpdate" `
    --summary-table true

belt-charts "results/bm_labs_*.csv" `
    -w 1400 `
    -h 800 `
    --type "bar" `
    --remove-first-ticks 2 `
    -o "results/timeseries.png" `
    --trim-prefix "bm_labs_" `
    -a "average" `
    --max-ticks 720 `
    --max-update 4 `
    --tick-window-aggregation 1