factorio_path="$HOME/Games/factorio_locked_versions/2_1_20/bin/x64/factorio"

# number of ticks to run per save file
ticks="72000"
# number of runs
runs="3"

generic_metrics="wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,trains,fluidFlowUpdate,electricNetworkUpdate,entityUpdate"
entity_metrics="Inserter,Furnace,AssemblingMachine,MiningDrill,Pump,InfinityContainer,Loader,InfinityPipe,ElectricEnergyInterface,Car,RocketSilo,Boiler,Explosion,Turret"
metrics="$generic_metrics,$entity_metrics"

belt --factorio-path "$factorio_path" \
benchmark ../../maps/480_belts \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../../../scripts/results.md.hbs \
--pattern "utility_science_*" \
--output results \
--strip-prefix "utility_science_" \
--verbose-metrics "$metrics"
