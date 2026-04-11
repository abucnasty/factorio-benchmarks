factorio_path="$HOME/.local/bin/factorio-mimalloc"

# number of ticks to run per save file
ticks="18000"
# number of runs
runs="3"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_path" \
benchmark ../maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../../scripts/results.md.hbs \
--pattern "[0-9]*" \
--output results \
--verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,trains"