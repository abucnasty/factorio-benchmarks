# Factorio Benchmark Results

**Platform:** windows-x86_64  
**Factorio Version:** unknown  

## Scenario
Experiment using liquid to void materials instead of only recyclers

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) |
|------|----------|----------|----------|-----|---------------------|
| rs-clocked-iron-480 | 2.027 | 1.623 | 4.381 | 494 | 3648 |
| liquid-iron-voider-240 | 1.940 | 0.970 | 4.367 | **516** | 3492 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| rs-clocked-iron-480 | 0.00% |
| liquid-iron-voider-240 | 4.63% |

![result_2_chart.svg](result_2_chart.svg)

## Conclusion