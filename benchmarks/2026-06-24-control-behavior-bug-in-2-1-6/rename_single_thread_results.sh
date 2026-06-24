#!/bin/bash
# Rename single-thread CSVs in place so basenames are distinct from previous
# experiments.
#
# Before: results_single_thread/loop_2056_circuit_no_condition_<version>_verbose_metrics.csv
# After:  results_single_thread/loop_2056_circuit_no_condition_<version>__single_thread_verbose_metrics.csv
set -euo pipefail

dir="results_single_thread/"
suffix="single_thread"

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
