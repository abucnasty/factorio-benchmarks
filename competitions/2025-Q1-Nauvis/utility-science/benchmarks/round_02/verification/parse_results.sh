#!/usr/bin/env bash
set -euo pipefail

# Parses a `belt sanitize --verbose` output.log into a markdown table of
# save,quality,amount,effective-science (quality-normalized). Save names are
# matched to results positionally: the Nth "- name.zip" entry in the
# "Found N save files" listing corresponds to the Nth "Production found:" block.

log_file="${1:-output.log}"
out_file="${2:-result.md}"
expected_science=34560000
underproduce_threshold=5000

sed -E 's/\x1b\[[0-9;]*m//g' "$log_file" | awk -v expected="$expected_science" -v threshold="$underproduce_threshold" '
  BEGIN {
    mult["normal"] = 1
    mult["uncommon"] = 2
    mult["rare"] = 3
    mult["epic"] = 4
    mult["legendary"] = 6
    print "| Save | Quality | Amount | Effective Science | Underproducing |"
    print "|------|---------|--------|--------------------|-----------------|"
  }
  match($0, /- ([A-Za-z0-9_.-]+)\.zip/, m) { saves[++si] = m[1]; next }
  match($0, /produced: ([a-z]+)-utility-science-pack \(([0-9.]+)\)/, m) {
    ri++
    effective = m[2] * mult[m[1]]
    status = (expected - effective >= threshold) ? "Yes" : ""
    printf "| %s | %s | %s | %.2f | %s |\n", saves[ri], m[1], m[2], effective, status
  }
' > "$out_file"

