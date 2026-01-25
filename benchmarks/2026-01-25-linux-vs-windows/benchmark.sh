# number of ticks to run per save file
ticks="216000" # 60 minutes
# number of runs
runs="1"

## linux + mimalloc
belt --factorio-path "/home/abucnasty/.local/bin/factorio-mimalloc" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../scripts/results.md.hbs \
--pattern "*dmb_main*" \
--output results_linux_mimalloc \
--verbose-metrics "all"

## linux (vanilla)
belt \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../scripts/results.md.hbs \
--pattern "*dmb_main*" \
--output results_linux_vanilla \
--verbose-metrics "all"