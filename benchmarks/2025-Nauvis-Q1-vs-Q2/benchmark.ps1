param (
    # number of ticks to run per save file
    [int]$ticks = 108000,
    # number of runs
    [int]$runs = 3
)
# belt benchmark maps_with_labs `
#     --ticks $ticks `
#     --runs $runs `
#     --run-order sequential `
#     --pattern "*2048*" `
#     --template-path ../../scripts/results.md.hbs `
#     --output maps_with_labs_2048_results `
#     --verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,spacePlatforms"

# cd maps_with_labs_2048_results
# chart-gen "q*.csv"
# cd ..


#  belt benchmark maps_with_labs `
#     --ticks $ticks `
#     --runs $runs `
#     --run-order sequential `
#     --pattern "*4096*" `
#     --template-path ../../scripts/results.md.hbs `
#     --output maps_with_labs_4096_results `
#     --verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,spacePlatforms"

# cd maps_with_labs_4096_results
# chart-gen "q*.csv"
# cd ..

# belt benchmark maps `
#     --ticks $ticks `
#     --runs $runs `
#     --run-order sequential `
#     --pattern "*lanes*" `
#     --template-path ../../scripts/results.md.hbs `
#     --output maps_calcite_import_results `
#     --verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,spacePlatforms"

# cd maps_calcite_import_results
# chart-gen "q*.csv"
# cd ..

 belt benchmark maps_no_labs `
    --ticks $ticks `
    --runs $runs `
    --run-order sequential `
    --pattern "*2048*" `
    --template-path ../../scripts/results.md.hbs `
    --output maps_no_labs_2048_results `
    --verbose-metrics "wholeUpdate,entityUpdate,controlBehaviorUpdate,transportLinesUpdate,electricHeatFluidCircuitUpdate,spacePlatforms"

cd maps_no_labs_2048_results
chart-gen "q*.csv"
cd ..