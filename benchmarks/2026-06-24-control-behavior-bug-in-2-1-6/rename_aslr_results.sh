#!/bin/bash
# Rename the ASLR-off benchmark CSVs in place so basenames are distinct from
# previous experiment runs (pinning, default).
#
# Before: results_aslr_off/loop_2056_circuit_no_condition_<version>_verbose_metrics.csv
# After:  results_aslr_off/loop_2056_circuit_no_condition_<version>__aslr_off_verbose_metrics.csv
set -euo pipefail

dir="results_aslr_off/"
suffix="aslr_off"

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
