# number of ticks to run per save file
ticks="18000"
# number of runs
runs="10"

# factorio configurations / injections
file_directory=$(dirname "$0")
factorio="$file_directory/factorio.sh"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ./noop \
--pattern "*dmb_main*" \
--output run_results \
--verbose-metrics "all"