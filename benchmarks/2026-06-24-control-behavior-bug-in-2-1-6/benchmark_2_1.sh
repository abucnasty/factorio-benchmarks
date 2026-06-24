script_dir=$(dirname "$0")
factorio_path="$script_dir/launchers/factorio_2_1"

prefix=$1

# number of ticks to run per save file
ticks="3600"
# number of runs
runs="50"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_path" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../scripts/results.md.hbs \
--pattern "*${prefix}*2_1_6*" \
--output "results_${prefix}" \
--append \
--verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,trains,fluidFlowUpdate,electricNetworkUpdate,particleUpdate"