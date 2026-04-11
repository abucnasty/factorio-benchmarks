factorio_path="$HOME/.local/bin/factorio-mimalloc-huge-pages"
template_path="../../../../../scripts/results.md.hbs"

# number of ticks to run per save file
ticks="24000"
# number of runs
runs="12"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_path" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path "$template_path" \
--pattern "*" \
--output results \
--verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,trains"