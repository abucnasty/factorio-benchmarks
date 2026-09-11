# number of ticks to run per save file
ticks="3600"
# number of runs
runs="20"
# path to factorio binary
factorio_path="$HOME/.local/bin/factorio-beta-mimalloc"
# output directory for benchmark results
output_dir="results"
# metrics to record
generic_metrics="wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate,particleUpdate,turretTargetAcquisition,spacePlatforms"
entity_metrics="Asteroid,Thruster,Pump,Turret,Projectile,AsteroidCollector"
metrics="$generic_metrics,$entity_metrics"

belt --factorio-path "$factorio_path" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../scripts/results.md.hbs \
--pattern "ship_benchmark_*" \
--output "$output_dir" \
--verbose-metrics "$metrics" \
--append