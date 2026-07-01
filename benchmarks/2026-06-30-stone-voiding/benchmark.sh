factorio_path="$HOME/.local/bin/factorio-beta-mimalloc"

# number of ticks to run per save file
ticks="7200"
# number of runs
runs="3"


## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_path" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../scripts/results.md.hbs \
--pattern "*bm_*" \
--output results \
--strip-prefix "bm_" \
--verbose-metrics "all"