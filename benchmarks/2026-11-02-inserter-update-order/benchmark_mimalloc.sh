# number of ticks to run per save file
ticks="15000"
# number of runs
runs="10"
# path to the factorio launcher
factorio_path="$PWD/launchers/factorio-2.1.24-mimalloc"
# output directory for benchmark results
output_dir="results_mimalloc"
# metrics to record
metrics="all"

belt --factorio-path "$factorio_path" --headless \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order random \
--template-path ../../scripts/results.md.hbs \
--pattern "*" \
--mods-dir mods \
--output "$output_dir" \
--verbose-metrics "$metrics"

# keep only the columns the charts read, compressed: belt-charts reads .csv.zst directly
"${BELT_CHARTS:-belt-charts}" prune "$output_dir/*_verbose_metrics.csv" --in-place --keep-only-charted --compress zst
