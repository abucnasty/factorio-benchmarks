# Factorio Benchmark Results

**Platform:** windows-x86_64  
**Factorio Version:** 2.0.63  

## Scenario
* Each save was tested for 36000 tick(s) and 3 run(s)

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) |
|------|----------|----------|----------|-----|---------------------|
| 14 | 2.706 | 0.983 | 9.304 | 369 | 292217 |
| 02 | 2.385 | 0.731 | 11.963 | 419 | 257551 |
| 00_baseline | 2.144 | 1.269 | 5.478 | 466 | 231607 |
| 05 | 2.078 | 1.507 | 4.505 | 481 | 224368 |
| 06 | 1.948 | 1.448 | 4.184 | 513 | 210392 |
| 07 | 1.941 | 0.922 | 4.635 | 515 | 209622 |
| 09 | 1.792 | 1.118 | 5.704 | 558 | 193457 |
| 15 | 1.774 | 0.726 | 7.451 | 563 | 191569 |
| 03 | 1.709 | 0.931 | 4.224 | 585 | 184563 |
| 08 | 1.643 | 0.686 | 6.839 | 608 | 177465 |
| 11 | 1.593 | 0.693 | 6.181 | 627 | 172027 |
| 01 | 1.576 | 0.612 | 5.336 | 634 | 170194 |
| 13 | 1.435 | 0.558 | 5.019 | 696 | 154983 |
| 04 | 1.427 | 0.562 | 3.604 | 701 | 154107 |
| 10 | 1.411 | 0.483 | 5.940 | 708 | 152352 |
| 16 | 1.327 | 0.720 | 4.203 | 753 | 143366 |
| 12 | 1.272 | 0.385 | 7.174 | **785** | 137436 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| 14 | 0.00% |
| 02 | 13.49% |
| 00_baseline | 26.27% |
| 05 | 30.25% |
| 06 | 38.90% |
| 07 | 39.40% |
| 09 | 51.05% |
| 15 | 52.54% |
| 03 | 58.40% |
| 08 | 64.67% |
| 11 | 69.87% |
| 01 | 71.70% |
| 13 | 88.54% |
| 04 | 89.75% |
| 10 | 91.81% |
| 16 | 103.83% |
| 12 | 112.62% |

![result_2_chart.svg](result_2_chart.svg)

## Conclusion