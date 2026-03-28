factorio_standalone_mimalloc_huge_pages="$HOME/.local/bin/factorio-mimalloc-huge-pages"


# number of ticks to run per save file
ticks="324000"
# number of runs
runs="1"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_standalone_mimalloc_huge_pages" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../scripts/results.md.hbs \
--pattern "*space_science_lab_sim*" \
--output results_lab_sim \
--verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,spacePlatforms"
