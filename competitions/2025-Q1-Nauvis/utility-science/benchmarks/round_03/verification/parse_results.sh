#!/usr/bin/env bash
set -euo pipefail

# Parses a `belt sanitize --verbose` output.log into a markdown table of
# save,quality,amount,effective-science (quality-normalized). Save names are
# matched to results positionally: the Nth "- name.zip" entry in the
# "Found N save files" listing corresponds to the Nth "Found sanitizer ...
# Parsing..." block. A save can produce more than one quality tier (e.g. a
# mixed q2/q3 belt), so produced lines are grouped by block, not counted 1:1.

log_file="${1:-output.log}"
out_file="${2:-result.md}"
expected_science=69120000
underproduce_threshold=10000

sed -E 's/\x1b\[[0-9;]*m//g' "$log_file" | awk -v expected="$expected_science" -v threshold="$underproduce_threshold" '
  BEGIN {
    mult["normal"] = 1
    mult["uncommon"] = 2
    mult["rare"] = 3
    mult["epic"] = 4
    mult["legendary"] = 6
  }
  match($0, /- ([A-Za-z0-9_.-]+)\.zip/, m) { saves[++si] = m[1]; next }
  /Found sanitizer at .*Parsing\.\.\./ { bi++; next }
  match($0, /produced: ([a-z]+)-utility-science-pack \(([0-9.]+)\)/, m) {
    effective[bi] += m[2] * mult[m[1]]
    qualities[bi] = (qualities[bi] == "") ? m[1] : qualities[bi] "+" m[1]
    amounts[bi] = (amounts[bi] == "") ? m[2] : amounts[bi] "+" m[2]
  }
  END {
    print "| Save | Quality | Amount | Effective Science | Underproducing |"
    print "|------|---------|--------|--------------------|-----------------|"
    for (i = 1; i <= bi; i++) {
      status = (expected - effective[i] >= threshold) ? "Yes" : ""
      printf "| %s | %s | %s | %.2f | %s |\n", saves[i], qualities[i], amounts[i], effective[i], status
    }
  }
' > "$out_file"

