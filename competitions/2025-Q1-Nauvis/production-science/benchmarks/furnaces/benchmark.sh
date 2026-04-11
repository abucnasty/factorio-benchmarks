factorio_path="$HOME/.local/bin/factorio-mimalloc"
template_path="../../../../../scripts/results.md.hbs"


# number of ticks to run per save file
ticks="36000"
# number of runs
runs="3"

belt --factorio-path "$factorio_path" benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path "$template_path" \
--pattern "*" \
--output results \
--verbose-metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,trains"