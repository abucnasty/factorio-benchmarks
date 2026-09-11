# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.1.17

**Date:** 2026-09-08

## Scenario
* Each save was tested for 3600 tick(s) and 30 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| collector_north_chunk | 3.261 | 2.777 | 5.684 | **306** | 352175 | 0.61% |
| collector_south_chunk | 3.281 | 2.784 | 5.801 | 304 | 354327 | 0.00% |

![run_distribution](charts/run_distribution.png)

Box and Whisker Plot:
![timeseries](charts/timeseries.png)

![metrics](charts/metrics.png)

## Conclusion