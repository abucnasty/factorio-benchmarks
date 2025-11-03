# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.72

## Scenario
* Each save was tested for 1601 tick(s) and 3 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| bm_5_tiles_backpressure_car_filtered_last_empty | 3.904 | 0.757 | 20.703 | 256 | 18750 | 0.00% |
| bm_5_tiles_backpressure_car_filtered_last_electronic_circuit | 3.781 | 0.769 | 21.393 | 264 | 18160 | 3.25% |
| bm_5_tiles_backpressure_car_filtered_first_empty | 3.127 | 0.767 | 16.734 | 319 | 15018 | 24.85% |
| bm_5_tiles_backpressure_car_filtered_first_electronic_circuit | 2.239 | 0.747 | 16.752 | 446 | 10755 | 74.48% |
| bm_5_tiles_backpressure_car_default | 2.212 | 0.753 | 17.519 | 452 | 10626 | 76.49% |
| bm_5_tiles_backpressure_car_full | 2.175 | 0.757 | 17.803 | 459 | 10444 | 79.55% |
| bm_5_tiles_backpressure_steel | 1.971 | 0.742 | 13.793 | 507 | 9467 | 98.08% |
| bm_5_tiles_backpressure_steel_q5 | 1.954 | 0.749 | 13.554 | 511 | 9384 | 99.81% |
| bm_5_tiles_backpressure_steel_q5_limited | 1.935 | 0.747 | 13.499 | 516 | 9293 | 101.78% |
| bm_5_tiles_backpressure_wood_limited | 1.934 | 0.741 | 13.658 | 516 | 9290 | 101.83% |
| bm_5_tiles_backpressure_iron_limited | 1.932 | 0.751 | 13.148 | 517 | 9277 | 102.14% |
| bm_5_tiles_backpressure_iron | 1.928 | 0.747 | 13.337 | 518 | 9258 | 102.52% |
| bm_5_tiles_backpressure_steel_q5_full | 1.923 | 0.747 | 13.790 | 520 | 9236 | 103.02% |
| bm_5_tiles_backpressure_steel_full | 1.916 | 0.744 | 13.322 | 521 | 9204 | 103.75% |
| bm_5_tiles_backpressure_wood_full | 1.915 | 0.740 | 13.416 | 522 | 9199 | 103.83% |
| bm_5_tiles_backpressure_iron_full | 1.915 | 0.747 | 12.852 | 522 | 9197 | 103.88% |
| bm_5_tiles_backpressure_wood | 1.912 | 0.738 | 12.978 | 523 | 9182 | 104.21% |
| bm_5_tiles_backpressure_steel_limited | 1.907 | 0.742 | 12.984 | **524** | 9160 | 104.69% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion