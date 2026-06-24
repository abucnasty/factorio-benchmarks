#!/bin/bash
# Rename N-sweep CSVs in place so basenames carry the N value and don't
# collide when belt-charts aggregates across all results_n*_threads/ dirs.
#
# Before: results_n02_threads/loop_2056_circuit_no_condition_<version>_verbose_metrics.csv
# After:  results_n02_threads/loop_2056_circuit_no_condition_<version>__n02_threads_verbose_metrics.csv
set -euo pipefail

for N in 02 04 08 16; do
  dir="results_n${N}_threads/"
  suffix="n${N}_threads"
  [ -d "$dir" ] || { echo "skip (no dir): $dir"; continue; }
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
done
