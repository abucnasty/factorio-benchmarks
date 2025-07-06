# Factorio Benchmark Results

**Platform:** windows-x86_64  
**Factorio Version:** 2.0.55  

## Scenario
Varying lab designs (64 * 240/s of each science in each test) running research prod

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) |
|------|----------|----------|----------|-----|---------------------|
| labs_research_prod_no_clock_stack_16 | 3.415 | 0.877 | 26.390 | 292 | 170766 |
| labs_research_prod_lead_follow_stack_16_v2 | 3.339 | 1.206 | 19.616 | 299 | 166954 |
| labs_research_prod_clocked_bulk | 2.859 | 1.027 | 39.334 | 349 | 142934 |
| labs_research_prod_lead_follow_stack_16 | 2.668 | 1.002 | 38.151 | 374 | 133382 |
| labs_research_prod_lead_follow_bulk_v2 | 2.649 | 1.118 | 22.577 | **377** | 132437 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| labs_research_prod_no_clock_stack_16 | 0.00% |
| labs_research_prod_lead_follow_stack_16_v2 | 2.31% |
| labs_research_prod_clocked_bulk | 19.48% |
| labs_research_prod_lead_follow_stack_16 | 28.05% |
| labs_research_prod_lead_follow_bulk_v2 | 29.02% |

![result_2_chart.svg](result_2_chart.svg)

## Conclusion