# Draws every chart listed in charts.json: the README's story charts, then each allocator session grouped by order and by build.
# Needs belt-charts 1.25.0 or newer (and Node.js 22.15 or newer for .csv.zst). Point BELT_CHARTS at another build to use it.
"${BELT_CHARTS:-belt-charts}" render charts.json
