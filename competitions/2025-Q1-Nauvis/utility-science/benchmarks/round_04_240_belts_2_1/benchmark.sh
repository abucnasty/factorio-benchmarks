factorio_path="$HOME/.local/bin/factorio-beta-mimalloc"

# number of ticks to run per save file
ticks="3600"
# number of runs
runs="3"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_path" \
benchmark ../../maps/240_belts_2_1 \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../../scripts/results.md.hbs \
--pattern "*princle*" \
--output results_all_metrics \
--strip-prefix "utility_science_" \
--verbose-metrics "all" \
--append