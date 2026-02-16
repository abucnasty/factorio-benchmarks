# number of ticks to run per save file
ticks="18000"
# number of runs
runs="10"

# factorio configurations / injections
factorio_standalone_mimalloc_huge_pages="/home/abucnasty/.local/bin/factorio-mimalloc-huge-pages"

## standalone + mimalloc + huge pages (variance)
belt --factorio-path "$factorio_standalone_mimalloc_huge_pages" \
benchmark maps \
--ticks $ticks \
--runs $runs \
--run-order sequential \
--template-path ./noop \
--pattern "*dmb_main*" \
--output results_linux_standalone_mimalloc_huge_pages_8GB \
--verbose-metrics "all"