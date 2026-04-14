factorio_path="$HOME/.local/bin/factorio-mimalloc"


# number of ticks to run per save file
ticks="108000"
# number of runs
runs="3"

# best designs plus composite designs
designs_glob_pattern="35"

belt --factorio-path "$factorio_path" \
benchmark ../../maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../../scripts/results.md.hbs  \
--pattern "$designs_glob_pattern*" \
--output results2 \
--verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,trains"