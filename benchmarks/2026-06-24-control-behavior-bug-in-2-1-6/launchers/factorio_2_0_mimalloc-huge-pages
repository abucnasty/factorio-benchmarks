#!/usr/bin/env bash
set -euo pipefail

# Path to Factorio
FACTORIO_BIN="${HOME}/Games/factorio/bin/x64/factorio"
# Path to mimalloc library
MIMALLOC_SO="${HOME}/dev/temp/mimalloc/out/release/libmimalloc.so"

# MIMALLOC_RESERVE_HUGE_OS_PAGES=N: where N is the number of 1GiB huge OS pages.
export MIMALLOC_RESERVE_HUGE_OS_PAGES=8
# MIMALLOC_PURGE_DELAY=N: the delay in N milli-seconds (by default 10) after which mimalloc will purge OS pages that are not in use.
# Setting to -1 disables purging.
export MIMALLOC_PURGE_DELAY=-1
# Shows stats on program termination
export MIMALLOC_SHOW_STATS=1

# Flags to always pass to Factorio
FACTORIO_FLAGS=(
  "--cache-sprite-atlas=true"
)

RUNNER=()
if command -v gamemoderun >/dev/null 2>&1; then
  RUNNER=(gamemoderun)
fi

env LD_PRELOAD="${MIMALLOC_SO}" \
  "${RUNNER[@]}" \
  "${FACTORIO_BIN}" \
  "${FACTORIO_FLAGS[@]}" \
  "$@"