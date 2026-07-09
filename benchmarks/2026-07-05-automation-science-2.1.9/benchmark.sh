# number of ticks to run per save file
ticks="18000"
# number of runs
runs="32"
# output directory for benchmark results
output_dir="results"
# metrics to record
metrics="all"

BASEDIR=$(dirname "$0")
launcher_directory="$BASEDIR/launchers"


benchmark_for_clone() {
    local clone_number="$1"

    belt --factorio-path "$launcher_directory/factorio_2_1_9" \
    benchmark maps \
    --ticks $ticks \
    --runs $runs \
    --run-order sequential \
    --template-path ../../scripts/results.md.hbs \
    --pattern "bm_red_*clone_${clone_number}_no_circuit*" \
    --output "results_clone_$clone_number" \
    --verbose-metrics "$metrics" \
    --append
}

# benchmark_for_clone 0
# benchmark_for_clone 1
# benchmark_for_clone 2
# benchmark_for_clone 3
# benchmark_for_clone 7
# benchmark_for_clone 9
# benchmark_for_clone 18
# benchmark_for_clone 30
# benchmark_for_clone 48