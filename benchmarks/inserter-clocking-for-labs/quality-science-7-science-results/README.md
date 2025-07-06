# Factorio Benchmark Results

**Platform:** windows-x86_64  
**Factorio Version:** 2.0.55  

## Scenario
Varying lab designs (32 * 240/s of each science in each test)

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) |
|------|----------|----------|----------|-----|---------------------|
| quality_q1_bot_speed | 0.889 | 0.504 | 15.312 | 1124 | 44468 |
| quality_q2_bot_speed | 0.663 | 0.357 | 6.382 | **1508** | 33162 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| quality_q1_bot_speed | 0.00% |
| quality_q2_bot_speed | 34.11% |

![result_2_chart.svg](result_2_chart.svg)

## Conclusion