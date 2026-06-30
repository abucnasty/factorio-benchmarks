factorio_path="$HOME/.local/bin/factorio-mimalloc"

# number of ticks to run per save file
ticks="36000"
# number of runs
runs="1"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_path" \
benchmark ../../maps/thaeln_cpu_troubleshoot \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../../../scripts/results.md.hbs \
--pattern "utility_science_*" \
--output results_thaeln \
--strip-prefix "utility_science_" \
--verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,trains,fluidFlowUpdate,electricNetworkUpdate,particleUpdate,constructionManagerUpdate"

