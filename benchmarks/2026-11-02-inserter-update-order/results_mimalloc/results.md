# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.1.24

**Date:** 2026-11-02

## Scenario
* Each save was tested for 15000 tick(s) and 10 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| 3i-2to1-as-saved | 1.405 | 0.691 | 9.972 | 711 | 210825 | 16.01% |
| 3i-2to1-memory-backward | 1.404 | 0.692 | 5.945 | 712 | 210555 | 16.16% |
| 3i-2to1-memory-forward | 1.398 | 0.682 | 5.163 | 715 | 209718 | 16.63% |
| 3i-2to1-shuffled | 1.599 | 0.792 | 6.172 | 625 | 239797 | 2.00% |
| 3i-3to1-as-saved | 1.429 | 0.783 | 5.103 | 699 | 214310 | 14.13% |
| 3i-3to1-memory-backward | 1.406 | 0.774 | 5.495 | 711 | 210957 | 15.94% |
| 3i-3to1-memory-forward | 1.415 | 0.774 | 6.290 | 706 | 212303 | 15.21% |
| 3i-3to1-shuffled | 1.630 | 0.935 | 6.290 | 613 | 244584 | 0.00% |
| 4i-as-saved | 1.364 | 0.616 | 6.990 | 733 | 204611 | 19.54% |
| 4i-memory-backward | 1.361 | 0.628 | 7.602 | 734 | 204164 | 19.80% |
| 4i-memory-forward | 1.347 | 0.622 | 7.869 | **742** | 202118 | 21.01% |
| 4i-shuffled | 1.455 | 0.660 | 7.402 | 687 | 218163 | 12.11% |

![run_distribution](charts/run_distribution.png)

Box and Whisker Plot:
![timeseries](charts/timeseries.png)

![metrics](charts/metrics.png)

## Conclusion