param (
    # number of ticks to run per save file
    [int]$ticks = 60000,
    # number of runs
    [int]$runs = 3,
    [string]$output_path = "results_verbose"
)
 belt benchmark maps `
    --ticks $ticks `
    --runs $runs `
    --run-order random `
    --template-path ../../../scripts/results.md.hbs `
    --pattern "red_design_*" `
    --output $output_path `
    --strip-prefix "red_design_" `
    --verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate"

cd $output_path
chart-gen "red_design*.csv"