#!/bin/bash
# Rename single-worker-thread CSVs in place so basenames are distinct.
#
# Before: results_single_worker_thread/loop_2056_circuit_no_condition_<version>_verbose_metrics.csv
# After:  results_single_worker_thread/loop_2056_circuit_no_condition_<version>__single_worker_thread_verbose_metrics.csv
set -euo pipefail

dir="results_single_worker_thread/"
suffix="single_worker_thread"

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
