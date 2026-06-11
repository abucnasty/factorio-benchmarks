# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.0.77

**Date:** 2026-06-10

## Scenario
* Each save was tested for 1600 tick(s) and 6 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| DI_4_miner_plain | 3.308 | 0.041 | 247.700 | 302 | 31760 | 0.00% |
| DI_2_miner_2_splitter | 2.634 | 0.103 | 28.883 | 379 | 25284 | 25.57% |
| DI_2_miner_1_splitter | 2.486 | 0.104 | 27.715 | **402** | 23862 | 33.03% |

![run_distribution](charts/run_distribution.png)

Box and Whisker Plot:
![timeseries](charts/timeseries.png)

![metrics](charts/metrics.png)

## Conclusion