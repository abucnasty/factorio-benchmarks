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
| uncommon-recycler-480         | 3.111    | 2.335    | 7.319    | 321     | 31112               |
| uncommon-recycler-480-clocked | 2.994    | 2.493    | 10.120   | 333     | 29945               |
| uncommon-landfill-miner       | 2.111    | 1.504    | 7.661    | **473** | 21111               |

![result_0_chart.svg](./images/result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](./images/result_1_chart.svg)

| Save                          | % Difference from base |
| ----------------------------- | ---------------------- |
| uncommon-recycler-480         | 0.00%                  |
| uncommon-recycler-480-clocked | 3.87%                  |
| uncommon-landfill-miner       | 47.41%                 |

![result_2_chart.svg](./images/result_2_chart.svg)

## Conclusion

Voiding with landfill is almost 50% more performant. 

Using an RS latch to turn on / off the miner makes a 3.9% improvement so still relevant.