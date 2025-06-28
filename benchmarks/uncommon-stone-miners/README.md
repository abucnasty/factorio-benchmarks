# Factorio Benchmark Results

**Platform:** windows-x86_64  
**Factorio Version:** 2.0.55  

## Scenario
- each save file produces 96,000 uncommon stone per second


## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save                          | Avg (ms) | Min (ms) | Max (ms) | UPS     | Execution Time (ms) |
| ----------------------------- | -------- | -------- | -------- | ------- | ------------------- |
| uncommon-recycler-480         | 3.021    | 2.319    | 5.389    | 331     | 15103               |
| uncommon-recycler-480-clocked | 2.927    | 2.522    | 4.898    | 341     | 14635               |
| uncommon-landfill-480-miner   | 1.736    | 1.266    | 3.344    | **575** | 8682                |

![result_0_chart.svg](./images/result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](./images/result_1_chart.svg)

| Save                          | % Difference from base |
| ----------------------------- | ---------------------- |
| uncommon-recycler-480         | 0.00%                  |
| uncommon-recycler-480-clocked | 3.19%                  |
| uncommon-landfill-480-miner   | 73.92%                 |

![result_2_chart.svg](./images/result_2_chart.svg)

## Conclusion

Voiding with landfill is 74% more performant.

Using an RS latch to turn on / off the miner makes a slight improvement so still relevant.