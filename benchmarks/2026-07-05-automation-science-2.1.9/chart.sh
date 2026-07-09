# initial ticks to remove
ticks_trim="3200"
# total number of ticks for timeseries charts
ticks_total="18000"


# belt-charts boxplot "./**/bm_*.csv" \
#     -w 1000 \
#     -h 800 \
#     --remove-first-ticks $ticks_trim \
#     --trim-prefix "bm_" \
#     -o "charts/run_distribution.png" \
#     --min-update 0

# All-clone scaling chart: whole update for all three designs across every clone count
belt-charts summary "results_clone_*/bm_*.csv" \
    -w 1200 \
    -h 800 \
    --remove-first-ticks $ticks_trim \
    -o "charts/whole_update_all_clones.png" \
    --aggregate-strategy "median" \
    --trim-prefix "bm_red_" \
    --trim-substring "_clone_0" \
    --trim-substring "_clone_1" \
    --trim-substring "_clone_2" \
    --trim-substring "_clone_3" \
    --trim-substring "_clone_7" \
    --trim-substring "_clone_9" \
    --trim-substring "_clone_18" \
    --trim-substring "_clone_30" \
    --trim-substring "_clone_48" \
    --group-by "clone_0,clone_1,clone_2,clone_3,clone_7,clone_9,clone_18,clone_30,clone_48" \
    --metrics "wholeUpdate" \
    --trim-prefix "bm_" \
    --summary-table false \
    --title-override "Whole Update Scaling Across All Clone Counts (18k Ticks, 32 Runs)"

# Overhead divergence chart: circuit, control, and transport sub-metrics at 18/30/48 clones
# Shows why Q1 loses at large scale despite similar entity update costs
# belt-charts summary "results_clone_{18,30,48}/bm_*.csv" \
#     -w 1200 \
#     -h 700 \
#     --remove-first-ticks $ticks_trim \
#     -o "charts/overhead_divergence.png" \
#     --aggregate-strategy "median" \
#     --metrics "electricHeatFluidCircuitUpdate,controlBehaviorUpdate,transportLinesUpdate" \
#     --trim-prefix "bm_" \
#     --trim-prefix "bm_red_" \
#     --trim-substring "_clone_18" \
#     --trim-substring "_clone_30" \
#     --trim-substring "_clone_48" \
#     --trim-substring "_48_belts" \
#     --group-by "clone_18,clone_30,clone_48" \
#     --summary-table false \
#     --title-override "Overhead Sub-metrics at Large Scale: 18, 30, and 48 Clones (18k Ticks, 32 Runs)"

# Q1 clocked vs unclocked across all clone counts: shows entity update explosion without clocking
# belt-charts summary "results_clone_*/bm_red_q1_48_belts_*.csv" \
#     -w 1200 \
#     -h 700 \
#     --remove-first-ticks $ticks_trim \
#     -o "charts/q1_clocked_vs_unclocked.png" \
#     --aggregate-strategy "median" \
#     --metrics "entityUpdate,electricHeatFluidCircuitUpdate,controlBehaviorUpdate,transportLinesUpdate" \
#     --trim-prefix "bm_red_" \
#     --trim-substring "_clone_0" \
#     --trim-substring "_clone_1" \
#     --trim-substring "_clone_2" \
#     --trim-substring "_clone_3" \
#     --trim-substring "_clone_7" \
#     --trim-substring "_clone_9" \
#     --trim-substring "_clone_18" \
#     --trim-substring "_clone_30" \
#     --trim-substring "_clone_48" \
#     --trim-substring "_48_belts" \
#     --group-by "clone_0,clone_1,clone_2,clone_3,clone_7,clone_9,clone_18,clone_30,clone_48" \
#     --summary-table false \
#     --title-override "Q1 Clocked vs Unclocked: Sub-metric Breakdown Across All Clone Counts (18k Ticks, 32 Runs)"

# Q1 clocked vs unclocked focused at clone_30 and clone_48 with summary table
# belt-charts summary "results_clone_{30,48}/bm_red_q1_48_belts_*.csv" \
#     -w 1000 \
#     -h 600 \
#     --remove-first-ticks $ticks_trim \
#     -o "charts/q1_large_scale_breakdown.png" \
#     --aggregate-strategy "median" \
#     --metrics "entityUpdate,electricHeatFluidCircuitUpdate,controlBehaviorUpdate,transportLinesUpdate" \
#     --trim-prefix "bm_red_48_belts_" \
#     --group-by "clone_30,clone_48" \
#     --summary-table false \
#     --title-override "Q1 Clocked vs Unclocked at Large Scale: 30 and 48 Clones (18k Ticks, 32 Runs)"


# summary_for_clone() {
#     local clone_number="$1"
#     local total_belts=$((48 + 48 * clone_number))
#     belt-charts summary "results_clone_$clone_number/bm_*.csv" \
#     -w 1000 \
#     -h 600 \
#     --remove-first-ticks $ticks_trim \
#     -o "charts/metrics_clone_$clone_number.png" \
#     --aggregate-strategy "average" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
#     --trim-prefix "bm_" \
#     --title-override "$total_belts Stacked Turbo Belts (Clones $clone_number) Average Metrics (18k Ticks, 32 Runs)" \
#     --trim-substring "_clone_$clone_number" \
#     --summary-table true
# }

# summary_for_clone 18
# summary_for_clone 30
# summary_for_clone 48


# electric_and_fluid_flow() {
#     local clone_number="$1"
#     local total_belts=$((48 + 48 * clone_number))
#     belt-charts summary "results_clone_$clone_number/bm_*.csv" \
#     -w 1200 \
#     -h 700 \
#     --remove-first-ticks $ticks_trim \
#     -o "charts/metrics_electric_heat_clone_$clone_number.png" \
#     --aggregate-strategy "average" \
#     --metrics "electricNetworkUpdate,fluidFlowUpdate" \
#     --trim-prefix "bm_" \
#     --title-override "$total_belts Stacked Turbo Belts Electric and Fluid Flow Metrics (18k Ticks, 32 Runs)" \
#     --summary-table true
# }

# electric_and_fluid_flow 0
# electric_and_fluid_flow 1
# electric_and_fluid_flow 2
# electric_and_fluid_flow 3
# electric_and_fluid_flow 7
# electric_and_fluid_flow 9
# electric_and_fluid_flow 18
# electric_and_fluid_flow 30
# electric_and_fluid_flow 48


# multithreaded_chart() {
#     local clone_number="$1"
#     local total_belts=$((48 + 48 * clone_number))
#     belt-charts summary "results_clone_$clone_number/bm_*.csv" \
#     -w 1000 \
#     -h 600 \
#     --remove-first-ticks $ticks_trim \
#     -o "charts/metrics_multithreaded_clone_$clone_number.png" \
#     --aggregate-strategy "average" \
#     --metrics "controlBehaviorUpdate,electricNetworkUpdate,fluidFlowUpdate,transportLinesUpdate" \
#     --trim-prefix "bm_" \
#     --trim-substring "_clone_$clone_number" \
#     --title-override "$total_belts Stacked Turbo Belts (Clones $clone_number) Multithreaded Metrics (18k Ticks, 32 Runs)" \
#     --summary-table true
# }

# multithreaded_chart 18
# multithreaded_chart 30
# multithreaded_chart 48


entity_breakdown() {
    local clone_number="$1"
    local total_belts=$((48 + 48 * clone_number))
    belt-charts entity-summary "results_clone_$clone_number/bm_*.csv" \
    -w 1200 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    --top-n 4 \
    -o "charts/metrics_entity_breakdown_clone_$clone_number.png" \
    --aggregate-strategy "average" \
    --trim-prefix "bm_" \
    --trim-substring "_clone_$clone_number" \
    --title-override "$total_belts Stacked Turbo Belts (Clones $clone_number) Entity Breakdown Metrics (18k Ticks, 32 Runs)" \
    --summary-table true
}
entity_breakdown 0
entity_breakdown 1
entity_breakdown 2
entity_breakdown 3
entity_breakdown 7
entity_breakdown 9
entity_breakdown 18
entity_breakdown 30
entity_breakdown 48


entity_breakdown_q1() {
    local clone_number="$1"
    local total_belts=$((48 + 48 * clone_number))
    belt-charts entity-summary "results_clone_$clone_number/bm_red_q1_*.csv" \
    -w 1200 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    --top-n 4 \
    -o "charts/metrics_entity_breakdown_q1_clone_$clone_number.png" \
    --aggregate-strategy "average" \
    --trim-prefix "bm_red_q1_" \
    --trim-substring "_clone_$clone_number" \
    --title-override "$total_belts Stacked Turbo Belts (Clones $clone_number) Entity Breakdown Q1 Metrics (18k Ticks, 32 Runs)" \
    --summary-table true
}

entity_breakdown_q1 0
entity_breakdown_q1 1
entity_breakdown_q1 2
entity_breakdown_q1 3
entity_breakdown_q1 7
entity_breakdown_q1 9
entity_breakdown_q1 18
entity_breakdown_q1 30
entity_breakdown_q1 48


entity_breakdown_q2() {
    local clone_number="$1"
    local total_belts=$((48 + 48 * clone_number))
    belt-charts entity-summary "results_clone_$clone_number/bm_red_q2_*.csv" \
    -w 1200 \
    -h 700 \
    --remove-first-ticks $ticks_trim \
    --top-n 4 \
    -o "charts/metrics_entity_breakdown_q2_clone_$clone_number.png" \
    --aggregate-strategy "average" \
    --trim-prefix "bm_red_q2_" \
    --trim-substring "_clone_$clone_number" \
    --title-override "$total_belts Stacked Turbo Belts (Clones $clone_number) Entity Breakdown Q2 Metrics (18k Ticks, 32 Runs)" \
    --summary-table true
}

entity_breakdown_q2 0
entity_breakdown_q2 1
entity_breakdown_q2 2
entity_breakdown_q2 3
entity_breakdown_q2 7
entity_breakdown_q2 9
entity_breakdown_q2 18
entity_breakdown_q2 30
entity_breakdown_q2 48

# belt-charts summary-per-run "./**/bm_*.csv" \
#     -w 2000 \
#     -h 700 \
#     --remove-first-ticks $ticks_trim \
#     -o "charts/metrics_per_run.png" \
#     --aggregate-strategy "average" \
#     --metrics "wholeUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,entityUpdate" \
#     --trim-prefix "bm_" \
#     --title-override "192 Stacked Turbo Belts Average Metrics Per Run (18k Ticks, 6 Runs)" \
#     --sort-by "run" \
#     --summary-table false


# belt-charts entity-summary "./**/bm_*.csv" \
#     --remove-first-ticks $ticks_trim \
#     -o "charts/entity_summary.png" \
#     --top-n 4 \
#     --trim-prefix "bm_"


# belt-charts entity-matrix "./**/bm_*.csv" \
#     --remove-first-ticks $ticks_trim \
#     -o "charts/entity_matrix.png" \
#     --top-n 20 \
#     --min-percent 2 \
#     --trim-prefix "bm_"
