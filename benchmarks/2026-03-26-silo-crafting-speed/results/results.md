# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.0.76

**Date:** 2026-03-26

## Scenario
* Each save was tested for 161700 tick(s) and 1 run(s)

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save                    | Avg (ms) | Min (ms) | Max (ms) | UPS      | Execution Time (ms) | % Difference from Worst |
| ----------------------- | -------- | -------- | -------- | -------- | ------------------- | ----------------------- |
| silo_q5_beacon_10_empty | 0.494    | 0.176    | 10.215   | 2022     | 79954               | 0.00%                   |
| silo_q5_beacon_08_empty | 0.492    | 0.174    | 9.737    | 2033     | 79529               | 0.53%                   |
| silo_q3                 | 0.490    | 0.175    | 9.769    | 2038     | 79305               | 0.82%                   |
| silo_q5_beacon_10       | 0.490    | 0.171    | 9.877    | 2040     | 79253               | 0.88%                   |
| silo_q5_beacon_08       | 0.487    | 0.171    | 10.073   | 2052     | 78771               | 1.50%                   |
| silo_q5_beacon_06_empty | 0.486    | 0.169    | 10.075   | 2059     | 78505               | 1.85%                   |
| silo_q5_beacon_04_empty | 0.482    | 0.168    | 10.650   | 2073     | 77966               | 2.55%                   |
| silo_q5_beacon_06       | 0.481    | 0.171    | 10.128   | 2078     | 77799               | 2.77%                   |
| silo_q5_beacon_04       | 0.479    | 0.163    | 10.457   | 2089     | 77390               | 3.31%                   |
| silo_q5_beacon_02_empty | 0.477    | 0.161    | 9.444    | 2097     | 77093               | 3.71%                   |
| silo_q5                 | 0.476    | 0.162    | 10.115   | 2100     | 76996               | 3.84%                   |
| silo_q5_beacon_02       | 0.476    | 0.159    | 10.313   | **2101** | 76927               | 3.93%                   |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion