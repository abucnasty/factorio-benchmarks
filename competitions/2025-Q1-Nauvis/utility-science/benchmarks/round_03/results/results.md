# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.1.20

**Date:** 2026-09-25

## Scenario
* Each save was tested for 72000 tick(s) and 3 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| abuc_q1_480 | 4.587 | 1.801 | 14.074 | 218 | 990809 | 150.92% |
| abuc_q2_480 | 4.475 | 2.622 | 10.586 | 223 | 966661 | 157.18% |
| andymann_q1_240 | 10.981 | 5.049 | 41.074 | 91 | 2371815 | 4.82% |
| atlan_q2_2880 | 3.128 | 1.543 | 10.450 | 319 | 675625 | 267.98% |
| atlan_q2_2880_LDS_DI | 3.178 | 1.644 | 8.937 | 314 | 686430 | 262.17% |
| atlan_q2q3_mixed_LDS_DI | 3.030 | 1.731 | 8.801 | 329 | 654585 | 279.80% |
| azhrei_q1 | 5.335 | 2.651 | 18.004 | 187 | 1152304 | 115.74% |
| baseline_q1_240 | 4.839 | 2.377 | 12.430 | 206 | 1045176 | 137.86% |
| baseline_q1_240_clocked | 4.838 | 1.784 | 14.780 | 206 | 1045041 | 137.89% |
| cy27_q1_480 | 5.003 | 1.701 | 20.041 | 199 | 1080581 | 130.07% |
| derantrix_q1_480 | 4.616 | 2.376 | 13.523 | 216 | 997200 | 149.31% |
| dorrian_q1_480 | 4.998 | 3.242 | 11.485 | 200 | 1079693 | 130.26% |
| flexime_q1_480 | 4.918 | 3.563 | 11.640 | 203 | 1062274 | 134.03% |
| mcmayhem57_q1_960_max_prod | 6.993 | 5.622 | 16.324 | 143 | 1510446 | 64.59% |
| mrx8024_q2_1440_v1.1 | 3.231 | 1.661 | 8.991 | 309 | 697896 | 256.22% |
| princle_2880_V1 | 5.513 | 4.120 | 13.041 | 181 | 1190838 | 108.77% |
| princle_2880_V2 | 5.589 | 4.218 | 13.644 | 178 | 1207315 | 105.92% |
| stupidfathobbit_q1_240 | 4.433 | 1.619 | 14.819 | 225 | 957565 | 159.63% |
| swiftdeath_q1_2880 | 5.027 | 2.856 | 13.741 | 198 | 1085792 | 128.96% |
| thaeln_q1_960 | 3.843 | 1.702 | 12.875 | 260 | 830067 | 199.50% |
| thaeln_q2_960 | 2.431 | 1.348 | 7.302 | 411 | 525193 | 373.36% |
| thaeln_q2_960_railgun | 2.335 | 1.114 | 7.588 | **428** | 504365 | 392.90% |
| theflyingcurryfish154_q1_1920 | 4.458 | 1.580 | 17.035 | 224 | 963012 | 158.16% |
| tou_q2_2880_railgun_1_offset | 2.388 | 1.241 | 7.775 | 418 | 515909 | 381.88% |
| tou_q2_2880_railgun_2_offset | 2.536 | 1.261 | 7.137 | 394 | 547707 | 353.90% |
| yuu_q5_480_clocked | 11.510 | 8.810 | 20.845 | 86 | 2486028 | 0.00% |

![run_distribution](charts/run_distribution.png)

Box and Whisker Plot:
![timeseries](charts/timeseries.png)

![metrics](charts/metrics.png)

## Conclusion