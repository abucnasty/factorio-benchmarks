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
| quality_q1_research_prod | 1.062 | 0.492 | 13.802 | 943 | 53119 |
| quality_q2_research_prod | 0.954 | 0.468 | 12.881 | **1051** | 47680 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| quality_q1_research_prod | 0.00% |
| quality_q2_research_prod | 11.44% |

![result_2_chart.svg](result_2_chart.svg)

## Conclusion