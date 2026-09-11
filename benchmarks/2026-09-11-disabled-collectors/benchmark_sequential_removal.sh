# number of ticks to run per save file
ticks="3600"
# number of runs
runs="6"
# path to factorio binary
factorio_path="$HOME/.local/bin/factorio-beta-mimalloc"
# output directory for benchmark results
output_dir="sequential_removal_results"
# metrics to record
generic_metrics="wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,particleUpdate,turretTargetAcquisition,spacePlatforms"
entity_metrics="Asteroid,Thruster,Pump,Turret,Projectile,AsteroidCollector"
metrics="$generic_metrics,$entity_metrics"

belt --factorio-path "$factorio_path" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../scripts/results.md.hbs \
--pattern "*side_collectors*" \
--output "$output_dir" \
--verbose-metrics "$metrics" \
--append