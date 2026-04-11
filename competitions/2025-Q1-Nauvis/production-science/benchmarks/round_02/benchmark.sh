# number of ticks to run per save file
ticks="108000" # 30 minutes
# number of runs
runs="3"

factorio_path="/home/abucnasty/.local/bin/factorio-mimalloc"

belt --factorio-path "$factorio_path" \
benchmark ../maps \
--ticks $ticks \
--runs $runs \
--run-order random \
--template-path ../../../../scripts/results.md.hbs \
--pattern "[0-9]*" \
--output results_linux \
--verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains"