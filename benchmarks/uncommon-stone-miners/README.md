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

| Save                                      | Avg (ms) | Min (ms) | Max (ms) | UPS     | Execution Time (ms) |
| ----------------------------------------- | -------- | -------- | -------- | ------- | ------------------- |
| uncommon-recycler-480                     | 3.138    | 2.309    | 7.363    | 319     | 18825               |
| uncommon-recycler-480-clocked             | 3.074    | 2.493    | 7.498    | 326     | 18443               |
| uncommon-landfill-miner                   | 2.091    | 1.519    | 5.923    | 478     | 12546               |
| uncommon-landfill-miner-reduced-inserters | 1.901    | 1.326    | 4.322    | **526** | 11404               |

![result_0_chart.svg](./images/result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](./images/result_1_chart.svg)

| Save                                      | % Difference from base |
| ----------------------------------------- | ---------------------- |
| uncommon-recycler-480                     | 0.00%                  |
| uncommon-recycler-480-clocked             | 2.13%                  |
| uncommon-landfill-miner                   | 49.73%                 |
| uncommon-landfill-miner-reduced-inserters | 64.66%                 |

![result_2_chart.svg](./images/result_2_chart.svg)

## Conclusion

Voiding with landfill is 65% more performant.

Using an RS latch to turn on / off the miner makes a slight improvement so still relevant.