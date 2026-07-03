# number of ticks to run per save file
ticks="1260"
# number of runs
runs="6"
# path to factorio binary
factorio_path="/home/abucnasty/.local/bin/factorio-mimalloc"
# output directory for benchmark results
output_dir="results"
# metrics to record
metrics="wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate"

BASEDIR=$(dirname "$0")
launcher_directory="$BASEDIR/launchers"

belt --factorio-path "$launcher_directory/factorio_2_0_77" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../scripts/results.md.hbs \
--pattern "bm_2_0_77*" \
--output results \
--verbose-metrics "$metrics" \
--append

belt --factorio-path "$launcher_directory/factorio_2_1_9" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../scripts/results.md.hbs \
--pattern "bm_2_1_9*" \
--output results \
--verbose-metrics "$metrics" \
--append