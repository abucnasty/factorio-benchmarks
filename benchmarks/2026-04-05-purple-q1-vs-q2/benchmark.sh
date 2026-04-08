factorio_standalone_mimalloc_huge_pages="$HOME/.local/bin/factorio-mimalloc"
mods_dir="$HOME/Games/factorio/mods"

# number of ticks to run per save file
ticks="72000"
# number of runs
runs="3"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_standalone_mimalloc_huge_pages" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../scripts/results.md.hbs \
--pattern "dmb_*" \
--output results \
--verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,spacePlatforms"