# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.0.77

**Date:** 2026-06-14

## Scenario
* Each save was tested for 36000 tick(s) and 1 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| baseline_480_clocked | 4.467 | 1.706 | 15.438 | 223 | 160815 | 0.00% |
| baseline_480_unclocked | 4.319 | 2.360 | 11.730 | 231 | 155492 | 3.42% |
| baseline_360_unclocked | 2.907 | 1.661 | 8.655 | 344 | 104642 | 53.68% |
| baseline_360_clocked | 2.810 | 1.205 | 10.059 | 355 | 101175 | 58.95% |
| baseline_240_unclocked | 1.766 | 1.042 | 5.177 | 566 | 63572 | 152.97% |
| baseline_240_clocked | 1.655 | 0.755 | 8.372 | **604** | 59572 | 169.95% |

![run_distribution](charts/run_distribution.png)

Box and Whisker Plot:
![timeseries](charts/timeseries.png)

![metrics](charts/metrics.png)

## Conclusion