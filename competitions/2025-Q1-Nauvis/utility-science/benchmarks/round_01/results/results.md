# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.1.20

**Date:** 2026-09-23

## Scenario
* Each save was tested for 36000 tick(s) and 3 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| abuc_q1_480 | 0.197 | 0.116 | 3.021 | 5082 | 21248 | 614.56% |
| abuc_q2_480 | 0.224 | 0.149 | 1.463 | 4461 | 24207 | 527.26% |
| andymann_q1_240 | 0.271 | 0.123 | 2.189 | 3694 | 29232 | 419.41% |
| atlan_q2_2880 | 0.186 | 0.110 | 2.162 | 5397 | 20012 | 658.73% |
| atlan_q2_2880_LDS_DI | 0.189 | 0.123 | 1.447 | 5289 | 20419 | 643.58% |
| azhrei_q1 | 0.213 | 0.129 | 1.501 | 4681 | 23067 | 558.20% |
| baseline_q1_240 | 0.248 | 0.191 | 1.457 | 4037 | 26752 | 467.54% |
| baseline_q1_240_clocked | 0.211 | 0.105 | 1.497 | 4734 | 22811 | 565.60% |
| crag_q1_2880 | 0.489 | 0.362 | 1.826 | 2044 | 52835 | 187.36% |
| cy27_q1_480 | 0.200 | 0.097 | 1.762 | 4997 | 21610 | 602.58% |
| derantrix_q1_480 | 0.200 | 0.124 | 1.652 | 4991 | 21637 | 601.68% |
| dorrian_q1_480 | 0.232 | 0.161 | 1.976 | 4306 | 25076 | 505.46% |
| flexime_q1_480 | 0.242 | 0.182 | 1.912 | 4135 | 26117 | 481.37% |
| mcmayhem57_q1_960_max_prod | 0.290 | 0.238 | 1.540 | 3442 | 31376 | 383.90% |
| mrx8024_q2_1440_v1.1 | 0.193 | 0.111 | 1.525 | 5184 | 20829 | 628.90% |
| poochuggah_q5 | 1.406 | 1.266 | 3.234 | 711 | 151828 | 0.00% |
| princle_2880_V1 | 0.253 | 0.189 | 1.542 | 3948 | 27352 | 455.08% |
| princle_2880_V2 | 0.251 | 0.196 | 1.506 | 3984 | 27105 | 460.16% |
| stupidfathobbit_q1_240 | 0.206 | 0.127 | 2.071 | 4857 | 22231 | 582.95% |
| swiftdeath_q1_2880 | 0.223 | 0.150 | 1.861 | 4486 | 24072 | 530.72% |
| thaeln_q1_960 | 0.189 | 0.103 | 3.080 | 5303 | 20366 | 645.51% |
| thaeln_q2_2880_railgun_tou_1 | 0.168 | 0.103 | 1.879 | 5926 | 18222 | 733.19% |
| thaeln_q2_2880_railgun_tou_2 | 0.165 | 0.102 | 1.453 | **6060** | 17819 | 752.02% |
| thaeln_q2_960 | 0.168 | 0.108 | 1.417 | 5952 | 18143 | 736.87% |
| thaeln_q2_960_railgun | 0.174 | 0.107 | 1.486 | 5733 | 18836 | 706.06% |
| thaeln_q3_960 | 0.411 | 0.268 | 1.857 | 2433 | 44376 | 242.16% |
| theflyingcurryfish154_q1_1920 | 0.208 | 0.112 | 1.520 | 4810 | 22449 | 576.31% |
| yuu_q5_480 | 0.451 | 0.355 | 1.743 | 2216 | 48723 | 211.61% |

![run_distribution](charts/run_distribution.png)

Box and Whisker Plot:
![timeseries](charts/timeseries.png)

![metrics](charts/metrics.png)

## Conclusion