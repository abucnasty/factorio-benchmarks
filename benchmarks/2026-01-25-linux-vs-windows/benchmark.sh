# number of ticks to run per save file
ticks="216000" # 60 minutes
# number of runs
runs="1"

# factorio configurations / injections
factorio_standalone="/home/abucnasty/.local/bin/factorio"
factorio_standalone_mimalloc="/home/abucnasty/.local/bin/factorio-mimalloc"
factorio_standalone_mimalloc_large_pages="/home/abucnasty/.local/bin/factorio-mimalloc-large-pages"
factorio_steam="/home/abucnasty/.local/bin/factorio-steam"
factorio_steam_mimalloc="/home/abucnasty/.local/bin/factorio-steam-mimalloc"
factorio_standalone_mimalloc_huge_pages="/home/abucnasty/.local/bin/factorio-mimalloc-huge-pages"

# ## standalone
# belt --factorio-path "$factorio_standalone" \
# benchmark maps \
# --ticks $ticks \
# --runs $runs \
# --run-order sequential \
# --template-path ./noop \
# --pattern "*dmb_main*" \
# --output results_linux_standalone \
# --verbose-metrics "all"

# ## standalone + mimalloc
# belt --factorio-path "$factorio_standalone_mimalloc" \
# benchmark maps \
# --ticks $ticks \
# --runs $runs \
# --run-order sequential \
# --template-path ./noop \
# --pattern "*dmb_main*" \
# --output results_linux_standalone_mimalloc \
# --verbose-metrics "all"

# ## steam
# belt --factorio-path "$factorio_steam" \
# benchmark maps \
# --ticks $ticks \
# --runs $runs \
# --run-order sequential \
# --template-path ./noop \
# --pattern "*dmb_main*" \
# --output results_linux_steam \
# --verbose-metrics "all"

# ## steam + mimalloc
# belt --factorio-path "$factorio_steam_mimalloc" \
# benchmark maps \
# --ticks $ticks \
# --runs $runs \
# --run-order sequential \
# --template-path ./noop \
# --pattern "*dmb_main*" \
# --output results_linux_steam_mimalloc \
# --verbose-metrics "all"

# ## steam (variance)
# belt --factorio-path "$factorio_steam" \
# benchmark maps \
# --ticks 18000 \
# --runs 10 \
# --run-order sequential \
# --template-path ./noop \
# --pattern "*dmb_main*" \
# --output results_linux_steam_multi_run \
# --verbose-metrics "all"

# ## standalone (variance)
# belt --factorio-path "$factorio_standalone" \
# benchmark maps \
# --ticks 18000 \
# --runs 10 \
# --run-order sequential \
# --template-path ./noop \
# --pattern "*dmb_main*" \
# --output results_linux_standalone_multi_run \
# --verbose-metrics "all"

# ## steam + mimalloc (variance)
# belt --factorio-path "$factorio_steam_mimalloc" \
# benchmark maps \
# --ticks 18000 \
# --runs 10 \
# --run-order sequential \
# --template-path ./noop \
# --pattern "*dmb_main*" \
# --output results_linux_steam_mimalloc_multi_run \
# --verbose-metrics "all"

# ## standalone + mimalloc (variance)
# belt --factorio-path "$factorio_standalone_mimalloc" \
# benchmark maps \
# --ticks 18000 \
# --runs 10 \
# --run-order sequential \
# --template-path ./noop \
# --pattern "*dmb_main*" \
# --output results_linux_standalone_mimalloc_multi_run \
# --verbose-metrics "all"

# ## standalone + mimalloc + large pages (variance)
# belt --factorio-path "$factorio_standalone_mimalloc_large_pages" \
# benchmark maps \
# --ticks 18000 \
# --runs 10 \
# --run-order sequential \
# --template-path ./noop \
# --pattern "*dmb_main*" \
# --output results_linux_standalone_mimalloc_large_pages_multi_run \
# --verbose-metrics "all"

## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_standalone_mimalloc_huge_pages" \
benchmark maps \
--ticks 18000 \
--runs 10 \
--run-order sequential \
--template-path ./noop \
--pattern "*dmb_main*" \
--output results_linux_standalone_mimalloc_huge_pages_4GB_multi_run \
--verbose-metrics "all"