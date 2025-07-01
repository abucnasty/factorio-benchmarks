# Factorio Benchmark Results

**Platform:** windows-x86_64  
**Factorio Version:** unknown  

## Scenario
- test scenario of 24 purple science blades making 3.45 million uncommon science per minute (240/s each)
- 10 runs per save file for 5000 ticks each

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save                             | Avg (ms) | Min (ms) | Max (ms) | UPS     | Execution Time (ms) |
| -------------------------------- | -------- | -------- | -------- | ------- | ------------------- |
| bm_uncommon_purple_v1            | 3.864    | 2.658    | 34.730   | 259     | 193222              |
| bm_uncommon_purple_v2.1          | 3.354    | 2.353    | 37.804   | 298     | 167714              |
| bm_uncommon_purple_v2.3          | 3.341    | 2.305    | 23.453   | 299     | 167030              |
| bm_uncommon_purple_v2.3_landfill | 2.978    | 2.003    | 7.566    | **336** | 148892              |

![result_0_chart.svg](./images/result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](./images/result_1_chart.svg)

| Save                             | % Difference from base |
| -------------------------------- | ---------------------- |
| bm_uncommon_purple_v1            | 0.00%                  |
| bm_uncommon_purple_v2.1          | 15.19%                 |
| bm_uncommon_purple_v2.3          | 15.63%                 |
| bm_uncommon_purple_v2.3_landfill | 29.72%                 |

![result_2_chart.svg](./images/result_2_chart.svg)

## Conclusion
the improvements made in the reduction in buildings and new inserter clocking methods have proven to increase the UPS efficiency by over 15%. The new landfill mining setup however, increases the UPS efficiency by an additional 15% over the best performer with the previous RS clocked uncommon upcycler for a total UPS increase of almost 30%.

This proves a hypothesis that I have that the mining voiding rig is one of the most UPS expesive parts of this entire setup and any improvements that can be made in these designs will have a major impact in the UPS efficiency of Q2 science.