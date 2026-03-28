factorio_standalone_mimalloc_huge_pages="$HOME/.local/bin/factorio-mimalloc-huge-pages"


# number of ticks to run per save file
ticks="648000"
# number of runs
runs="1"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_standalone_mimalloc_huge_pages" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../scripts/results.md.hbs \
--pattern "space_science_Q5_1280SPS_Walt_MK2.9*" \
--output results_three_hour_walt_mk2_9 \
--verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,spacePlatforms"