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
| labs_mining_prod_no_clock_stack_16 | 1.892 | 0.599 | 19.079 | 528 | 34063 |
| labs_mining_prod_clocked_bulk | 1.847 | 0.507 | 28.700 | 542 | 33233 |
| labs_mining_prod_lead_follow_multinet | 1.597 | 0.852 | 9.644 | 626 | 28741 |
| labs_mining_prod_lead_follow_stack_4_12 | 1.411 | 0.769 | 10.865 | 708 | 25405 |
| labs_mining_prod_lead_follow_bulk | 1.410 | 0.822 | 10.682 | 708 | 25392 |
| labs_mining_prod_lead_follow_stack_auto | 1.400 | 0.819 | 9.986 | 714 | 25197 |
| labs_mining_prod_lead_follow_stack_4_8 | 1.376 | 0.731 | 12.184 | **726** | 24765 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| labs_mining_prod_no_clock_stack_16 | 0.00% |
| labs_mining_prod_clocked_bulk | 2.49% |
| labs_mining_prod_lead_follow_multinet | 18.45% |
| labs_mining_prod_lead_follow_stack_4_12 | 34.01% |
| labs_mining_prod_lead_follow_bulk | 34.05% |
| labs_mining_prod_lead_follow_stack_auto | 35.09% |
| labs_mining_prod_lead_follow_stack_4_8 | 37.43% |

![result_2_chart.svg](result_2_chart.svg)

## Conclusion