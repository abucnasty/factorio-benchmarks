# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.0.76

**Date:** 2026-03-24

## Scenario
* Each save was tested for 324000 tick(s) and 1 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| space_science_lab_sim_Q1_7680SPS_Heisenberg_MK2 | 0.267 | 0.136 | 10.826 | 3740 | 86615 | 0.00% |
| space_science_lab_sim_Q4_1920SPS_Skylar | 0.224 | 0.141 | 3.735 | 4463 | 72594 | 19.32% |
| space_science_lab_sim_Q2_3840SPS_Saul | 0.217 | 0.131 | 2.870 | 4612 | 70244 | 23.31% |
| space_science_lab_sim_Q5_1280SPS_Walt_MK2.7 | 0.210 | 0.120 | 3.951 | 4770 | 67916 | 27.53% |
| space_science_lab_sim_Q3_2560SPS_Jesse_MK2 | 0.195 | 0.110 | 4.205 | **5122** | 63244 | 36.95% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion