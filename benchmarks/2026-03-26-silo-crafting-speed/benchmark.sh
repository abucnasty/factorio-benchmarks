factorio_standalone_mimalloc_huge_pages="$HOME/.local/bin/factorio-mimalloc-huge-pages"


# number of ticks to run per save file
ticks="161700" # 100 launches (each launch is 1617 ticks)
# number of runs
runs="1"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_standalone_mimalloc_huge_pages" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order random \
--template-path ../../scripts/results.md.hbs \
--pattern "*silo*" \
--output results \
--verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,fluidFlowUpdate,electricNetworkUpdate"