# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.72

## Scenario
* Each save was tested for 3600 tick(s) and 10 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| bm_pwm_30_no_machine | 0.632 | 0.134 | 2.419 | 1582 | 22745 | 0.00% |
| bm_pwm_30 | 0.234 | 0.143 | 3.988 | **4290** | 8409 | 171.08% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion