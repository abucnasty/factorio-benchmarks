#!/bin/bash
# Rename the per-strategy benchmark CSVs in place so the aggregator sees unique
# filenames across results_pin_* directories.
#
# Before: results_pin_<strategy>/loop_2056_circuit_no_condition_<version>_verbose_metrics.csv
# After:  results_pin_<strategy>/loop_2056_circuit_no_condition_<version>__pin_<strategy>_verbose_metrics.csv
set -euo pipefail

for dir in results_pin_*/; do
  strategy="${dir#results_pin_}"
  strategy="${strategy%/}"
  for csv in "${dir}"loop_*_verbose_metrics.csv; do
    [ -e "$csv" ] || continue
    base=$(basename "$csv")
    # Skip if already renamed
    if [[ "$base" == *"__pin_${strategy}_verbose_metrics.csv" ]]; then
      echo "skip (already renamed): $csv"
      continue
    fi
    stem="${base%_verbose_metrics.csv}"
    new="${dir}${stem}__pin_${strategy}_verbose_metrics.csv"
    echo "mv $csv -> $new"
    mv "$csv" "$new"
  done
done
