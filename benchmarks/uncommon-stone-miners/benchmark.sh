# number of ticks to run per save file
ticks="18000"
# number of runs
runs="3"

factorio_path="/home/abucnasty/.local/bin/factorio-mimalloc"

belt --factorio-path "$factorio_path" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order random \
--template-path ../../scripts/results.md.hbs \
--pattern "bm_*" \
--output results \
--verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains,spacePlatforms"