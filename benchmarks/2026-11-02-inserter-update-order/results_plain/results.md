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
| 3i-2to1-as-saved | 1.754 | 0.999 | 6.783 | 570 | 263091 | 10.47% |
| 3i-2to1-memory-backward | 1.675 | 0.925 | 6.077 | 596 | 251305 | 15.65% |
| 3i-2to1-memory-forward | 1.663 | 0.904 | 6.274 | 601 | 249487 | 16.49% |
| 3i-2to1-shuffled | 1.912 | 1.058 | 6.175 | 522 | 286831 | 1.32% |
| 3i-3to1-as-saved | 1.760 | 1.093 | 6.203 | 568 | 263957 | 10.10% |
| 3i-3to1-memory-backward | 1.671 | 1.001 | 6.161 | 598 | 250640 | 15.95% |
| 3i-3to1-memory-forward | 1.674 | 0.978 | 7.449 | 597 | 251153 | 15.72% |
| 3i-3to1-shuffled | 1.937 | 1.184 | 6.853 | 516 | 290621 | 0.00% |
| 4i-as-saved | 1.738 | 0.940 | 8.709 | 575 | 260675 | 11.49% |
| 4i-memory-backward | 1.681 | 0.854 | 7.925 | 594 | 252148 | 15.26% |
| 4i-memory-forward | 1.638 | 0.825 | 7.927 | **610** | 245688 | 18.29% |
| 4i-shuffled | 1.796 | 0.952 | 8.778 | 556 | 269477 | 7.85% |

![run_distribution](charts/run_distribution.png)

Box and Whisker Plot:
![timeseries](charts/timeseries.png)

![metrics](charts/metrics.png)

## Conclusion