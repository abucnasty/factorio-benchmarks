# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.0.76

**Date:** 2026-04-10

## Scenario
* Each save was tested for 9600 tick(s) and 6 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| bm_prod_mod_80_thaeln_cars | 0.629 | 0.124 | 9.762 | 1589 | 36234 | 0.00% |
| bm_prod_mod_80_thaeln_cars_green_clocked | 0.602 | 0.101 | 9.709 | 1662 | 34648 | 4.58% |
| bm_prod_mod_80_thaeln_cars_green_clocked_one_slot | 0.593 | 0.113 | 9.498 | **1687** | 34138 | 6.14% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion