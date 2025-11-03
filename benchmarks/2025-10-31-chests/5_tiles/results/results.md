# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.72

## Scenario
* Each save was tested for 8020 tick(s) and 3 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| bm_5_tiles_car_filtered_last_empty_disabled | 4.307 | 0.127 | 12.893 | 232 | 103630 | 0.00% |
| bm_5_tiles_car_filtered_last_coin_disabled | 4.083 | 0.112 | 13.201 | 244 | 98233 | 5.50% |
| bm_5_tiles_car | 3.137 | 0.769 | 11.114 | 318 | 75484 | 37.38% |
| bm_5_tiles_car_filtered_first_empty_disabled | 3.031 | 0.120 | 9.940 | 329 | 72917 | 42.12% |
| bm_5_tiles_car_filtered_first_coin_disabled | 2.209 | 0.126 | 10.209 | 453 | 53144 | 95.14% |
| bm_5_tiles_car_disabled | 2.126 | 0.130 | 9.278 | 470 | 51148 | 102.66% |
| bm_5_tiles_steel_q5_chest | 1.974 | 0.139 | 12.343 | 506 | 47507 | 118.14% |
| bm_5_tiles_steel_q5_chest_limited | 1.948 | 0.137 | 12.822 | 513 | 46862 | 121.16% |
| bm_5_tiles_iron_chest | 1.932 | 0.128 | 11.913 | 517 | 46494 | 122.96% |
| bm_5_tiles_steel_chest | 1.922 | 0.117 | 11.892 | 520 | 46234 | 124.19% |
| bm_5_tiles_wood_chest | 1.921 | 0.140 | 12.257 | 520 | 46211 | 124.25% |
| bm_5_tiles_iron_chest_limited | 1.911 | 0.125 | 11.791 | 523 | 45970 | 125.47% |
| bm_5_tiles_steel_chest_limited | 1.910 | 0.123 | 12.234 | 523 | 45948 | 125.60% |
| bm_5_tiles_wood_chest_limited | 1.905 | 0.123 | 12.344 | **525** | 45821 | 126.16% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion