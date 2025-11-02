# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.72

## Scenario
* Each save was tested for 1601 tick(s) and 3 run(s)

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save                                                          | Avg (ms) | Min (ms) | Max (ms) | UPS     | Execution Time (ms) | % Difference from Worst |
| ------------------------------------------------------------- | -------- | -------- | -------- | ------- | ------------------- | ----------------------- |
| bm_5_tiles_backpressure_car_filtered_last_empty               | 3.973    | 0.781    | 21.066   | 251     | 19082               | 0.00%                   |
| bm_5_tiles_backpressure_car_filtered_first_empty              | 3.134    | 0.758    | 16.864   | 319     | 15052               | 26.71%                  |
| bm_5_tiles_backpressure_car_default                           | 2.207    | 0.751    | 17.254   | 453     | 10602               | 79.96%                  |
| bm_5_tiles_backpressure_car_full                              | 2.193    | 0.753    | 17.088   | 456     | 10533               | 81.09%                  |
| bm_5_tiles_backpressure_car_filtered_first_electronic_circuit | 2.174    | 0.756    | 17.322   | 459     | 10442               | 82.66%                  |
| bm_5_tiles_backpressure_steel_q5_full                         | 1.970    | 0.745    | 13.514   | 508     | 9461                | 101.84%                 |
| bm_5_tiles_backpressure_iron                                  | 1.952    | 0.748    | 13.731   | 512     | 9377                | 103.60%                 |
| bm_5_tiles_backpressure_wood_full                             | 1.941    | 0.745    | 13.283   | 515     | 9323                | 104.69%                 |
| bm_5_tiles_backpressure_wood_limited                          | 1.938    | 0.744    | 12.937   | 516     | 9307                | 104.95%                 |
| bm_5_tiles_backpressure_steel_q5                              | 1.937    | 0.740    | 13.963   | 516     | 9303                | 105.00%                 |
| bm_5_tiles_backpressure_steel                                 | 1.920    | 0.747    | 13.136   | 520     | 9222                | 106.80%                 |
| bm_5_tiles_backpressure_steel_q5_limited                      | 1.920    | 0.741    | 13.324   | 520     | 9220                | 106.84%                 |
| bm_5_tiles_backpressure_iron_limited                          | 1.918    | 0.750    | 13.008   | 521     | 9210                | 107.07%                 |
| bm_5_tiles_backpressure_wood                                  | 1.916    | 0.740    | 13.375   | 522     | 9202                | 107.30%                 |
| bm_5_tiles_backpressure_steel_full                            | 1.912    | 0.746    | 13.172   | 523     | 9182                | 107.70%                 |
| bm_5_tiles_backpressure_steel_limited                         | 1.907    | 0.749    | 13.677   | 524     | 9162                | 108.16%                 |
| bm_5_tiles_backpressure_iron_full                             | 1.899    | 0.744    | 12.810   | **526** | 9120                | 109.12%                 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion