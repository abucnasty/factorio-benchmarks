# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.1.17

**Date:** 2026-09-08

## Scenario
* Each save was tested for 3600 tick(s) and 20 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| ship_benchmark_50_aligned | 3.278 | 2.795 | 7.880 | **305** | 236014 | 3.05% |
| ship_benchmark_50_nonaligned | 3.378 | 2.842 | 8.380 | 296 | 243223 | 0.00% |
| ship_benchmark_50_sides_nonaligned | 3.370 | 2.846 | 8.669 | 296 | 242666 | 0.23% |

![run_distribution](charts/run_distribution.png)

Box and Whisker Plot:
![timeseries](charts/timeseries.png)

![metrics](charts/metrics.png)

## Conclusion