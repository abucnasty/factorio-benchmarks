# Factorio Benchmark Results

**Platform:** windows-x86_64  
**Factorio Version:** 2.0.55  

## Scenario
Varying lab designs (64 * 240/s of each science in each test) runing robot worker speed

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) |
|------|----------|----------|----------|-----|---------------------|
| labs_bot_speed_no_clock_stack_16 | 3.722 | 0.902 | 28.365 | 268 | 186084 |
| labs_bot_speed_clocked_bulk | 2.506 | 0.934 | 32.000 | 399 | 125314 |
| labs_bot_speed_lead_follow_stack_16 | 2.471 | 1.013 | 26.317 | 404 | 123546 |
| labs_bot_speed_lead_follow_stack_16_v2 | 2.414 | 1.166 | 20.002 | 414 | 120689 |
| labs_bot_speed_lead_follow_bulk_v2 | 2.120 | 1.167 | 14.140 | **471** | 106003 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| labs_bot_speed_no_clock_stack_16 | 0.00% |
| labs_bot_speed_clocked_bulk | 48.50% |
| labs_bot_speed_lead_follow_stack_16 | 50.65% |
| labs_bot_speed_lead_follow_stack_16_v2 | 54.25% |
| labs_bot_speed_lead_follow_bulk_v2 | 75.53% |

![result_2_chart.svg](result_2_chart.svg)

## Conclusion