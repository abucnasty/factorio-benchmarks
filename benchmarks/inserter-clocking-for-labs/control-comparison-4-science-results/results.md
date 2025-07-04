# Factorio Benchmark Results

**Platform:** windows-x86_64  
**Factorio Version:** 2.0.55  

## Scenario
Lorem ipsum..

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) |
|------|----------|----------|----------|-----|---------------------|
| labs_mining_prod_clocked_bulk | 1.846 | 0.507 | 32.322 | 542 | 13291 |
| labs_mining_prod_no_clock_stack_16 | 1.797 | 0.583 | 19.986 | 556 | 12941 |
| labs_mining_prod_lead_follow_stack_16_v2 | 1.448 | 0.840 | 7.317 | 691 | 10426 |
| labs_mining_prod_lead_follow_bulk_v2 | 1.398 | 0.825 | 10.107 | 714 | 10071 |
| labs_mining_prod_lead_follow_stack_16 | 1.385 | 0.847 | 10.446 | **722** | 9970 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| labs_mining_prod_clocked_bulk | 0.00% |
| labs_mining_prod_no_clock_stack_16 | 2.50% |
| labs_mining_prod_lead_follow_stack_16_v2 | 27.37% |
| labs_mining_prod_lead_follow_bulk_v2 | 31.71% |
| labs_mining_prod_lead_follow_stack_16 | 33.04% |

![result_2_chart.svg](result_2_chart.svg)

## Conclusion