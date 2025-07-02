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
| labs_research_prod_no_clock_stack_16 | 3.445 | 0.919 | 27.311 | 290 | 62007 |
| labs_research_prod_lead_follow_multinet | 3.407 | 1.113 | 33.018 | 293 | 61328 |
| labs_research_prod_lead_follow_stack_4_12 | 2.967 | 1.055 | 19.947 | 337 | 53406 |
| labs_research_prod_lead_follow_stack_4_8 | 2.918 | 1.040 | 16.572 | 342 | 52523 |
| labs_research_prod_clocked_bulk | 2.812 | 1.057 | 33.415 | 355 | 50620 |
| labs_research_prod_lead_follow_stack_auto | 2.775 | 1.158 | 17.942 | 360 | 49951 |
| labs_research_prod_lead_follow_bulk | 2.617 | 1.127 | 25.552 | **382** | 47102 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| labs_research_prod_no_clock_stack_16 | 0.00% |
| labs_research_prod_lead_follow_multinet | 1.11% |
| labs_research_prod_lead_follow_stack_4_12 | 16.11% |
| labs_research_prod_lead_follow_stack_4_8 | 18.09% |
| labs_research_prod_clocked_bulk | 22.49% |
| labs_research_prod_lead_follow_stack_auto | 24.13% |
| labs_research_prod_lead_follow_bulk | 31.63% |

![result_2_chart.svg](result_2_chart.svg)

## Conclusion