param (
    # number of ticks to run per save file
    [int]$ticks = 216000, # 60 minutes
    # number of runs
    [int]$runs = 1
)

# windows (vanilla)
belt --verbose `
benchmark maps `
--ticks $ticks `
--runs $runs `
--run-order sequential `
--template-path ../../../scripts/results.md.hbs `
--pattern "*dmb_main*" `
--output results_windows_vanilla `
--verbose-metrics "all"

# windows (injector) 
belt --factorio-path "C:\Program Files (x86)\Steam\steamapps\common\Factorio\bin\x64\Injector.exe" --verbose `
benchmark maps `
--ticks $ticks `
--runs $runs `
--run-order sequential `
--template-path ../../../scripts/results.md.hbs `
--pattern "*dmb_main*" `
--output results_windows_injector `
--verbose-metrics "all"

## windows (vanilla) multi run
belt --verbose `
benchmark maps `
--ticks 18000 `
--runs 10 `
--run-order sequential `
--template-path ../../../scripts/results.md.hbs `
--pattern "*dmb_main*" `
--output results_windows_vanilla_multi_run `
--verbose-metrics "all"