# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.0.76

**Date:** 2026-04-09

## Scenario
* Each save was tested for 72000 tick(s) and 1 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| dmb_purple_q2_worker_robot_speed | 5.080 | 3.795 | 25.594 | 196 | 365729 | 0.00% |
| dmb_purple_q1_worker_robot_speed | 4.601 | 3.389 | 24.895 | 217 | 331253 | 10.41% |
| dmb_purple_q2_mining_prod | 3.464 | 2.490 | 24.531 | 288 | 249434 | 46.62% |
| dmb_purple_q1_mining_prod | 3.139 | 2.264 | 23.488 | 318 | 226022 | 61.81% |
| dmb_purple_q2_idle | 2.187 | 1.525 | 21.836 | 457 | 157436 | 132.30% |
| dmb_purple_q1_idle | 2.080 | 1.457 | 22.116 | **480** | 149785 | 144.17% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion