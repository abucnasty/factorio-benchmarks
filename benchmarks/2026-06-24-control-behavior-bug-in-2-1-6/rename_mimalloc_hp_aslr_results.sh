#!/bin/bash
# Rename mimalloc + huge pages + ASLR off CSVs in place so basenames are
# distinct from previous experiments (pinning, aslr_off, default).
#
# Before: results_mimalloc_hp_aslr_off/loop_2056_circuit_no_condition_<version>_verbose_metrics.csv
# After:  results_mimalloc_hp_aslr_off/loop_2056_circuit_no_condition_<version>__mimalloc_hp_aslr_off_verbose_metrics.csv
set -euo pipefail

dir="results_mimalloc_hp_aslr_off/"
suffix="mimalloc_hp_aslr_off"

for csv in "${dir}"loop_*_verbose_metrics.csv; do
  [ -e "$csv" ] || continue
  base=$(basename "$csv")
  if [[ "$base" == *"__${suffix}_verbose_metrics.csv" ]]; then
    echo "skip (already renamed): $csv"
    continue
  fi
  stem="${base%_verbose_metrics.csv}"
  new="${dir}${stem}__${suffix}_verbose_metrics.csv"
  echo "mv $csv -> $new"
  mv "$csv" "$new"
done
