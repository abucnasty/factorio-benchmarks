# number of ticks to run per save file
ticks="1600"
# number of runs
runs="6"
# path to factorio binary
factorio_path="/home/abucnasty/.local/bin/factorio-mimalloc"
# output directory for benchmark results
output_dir="results"
# metrics to record
metrics="wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate"


belt --factorio-path "$factorio_path" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order random \
--template-path ../../scripts/results.md.hbs \
--pattern "*" \
--output $output_dir \
--verbose-metrics "$metrics"