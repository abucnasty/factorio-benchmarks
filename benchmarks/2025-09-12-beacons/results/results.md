# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.66

## Scenario
* Each save was tested for 3600 tick(s) and 3 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| 2_module | 1.759 | 1.172 | 355.745 | 568 | 18997 | 0.00% |
| 1_module | 1.743 | 1.172 | 338.819 | 573 | 18824 | 0.91% |
| 0_module_legendary | 1.710 | 1.172 | 63.402 | 584 | 18470 | 2.85% |
| 30_ticks_placement_apart | 1.678 | 1.171 | 36.526 | 595 | 18124 | 4.81% |
| 0_module | 1.665 | 1.170 | 57.642 | **600** | 17987 | 5.61% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion