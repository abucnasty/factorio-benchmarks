# number of ticks to run per save file
ticks="216000" # 60 minutes
# number of runs
runs="1"

## standalone
belt --factorio-path "/home/abucnasty/.local/bin/factorio" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../scripts/results.md.hbs \
--pattern "*dmb_main*" \
--output results_linux_standalone \
--verbose-metrics "all"

## standalone + mimalloc
belt --factorio-path "/home/abucnasty/.local/bin/factorio-mimalloc" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ../../../scripts/results.md.hbs \
--pattern "*dmb_main*" \
--output results_linux_standalone_mimalloc \
--verbose-metrics "all"

# ## steam
# belt --factorio-path "/home/abucnasty/.local/bin/factorio-steam" \
# benchmark maps \
# --ticks $ticks \
# --runs $runs \
# --run-order sequential \
# --template-path ../../../scripts/results.md.hbs \
# --pattern "*dmb_main*" \
# --output results_linux_steam \
# --verbose-metrics "all"

# ## steam + mimalloc
# belt --factorio-path "/home/abucnasty/.local/bin/factorio-steam-mimalloc" \
# benchmark maps \
# --ticks $ticks \
# --runs $runs \
# --run-order sequential \
# --template-path ../../../scripts/results.md.hbs \
# --pattern "*dmb_main*" \
# --output results_linux_steam_mimalloc \
# --verbose-metrics "all"

## steam + mimalloc (variance)
belt --factorio-path "/home/abucnasty/.local/bin/factorio-steam-mimalloc" \
benchmark maps \
--ticks 18000 \
--runs 10 \
--run-order sequential \
--template-path ../../../scripts/results.md.hbs \
--pattern "*dmb_main*" \
--output results_linux_steam_mimalloc_multi_run \
--verbose-metrics "all"

## standalone + mimalloc (variance)
belt --factorio-path "/home/abucnasty/.local/bin/factorio-mimalloc" \
benchmark maps \
--ticks 18000 \
--runs 10 \
--run-order sequential \
--template-path ../../../scripts/results.md.hbs \
--pattern "*dmb_main*" \
--output results_linux_standalone_mimalloc_multi_run \
--verbose-metrics "all"