# Factorio Benchmark Results

**Platform:** linux-x86_64

**Factorio Version:** 2.1.20

**Date:** 2026-09-24

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
| abuc_q1_480 | 1.650 | 0.746 | 5.469 | 606 | 356405 | 155.53% |
| abuc_q2_480 | 1.751 | 1.131 | 4.628 | 570 | 378336 | 140.72% |
| andymann_q1_240 | 3.817 | 1.413 | 19.118 | 262 | 824436 | 10.47% |
| atlan_q2_2880 | 1.327 | 0.763 | 4.771 | 753 | 286642 | 217.73% |
| atlan_q2_2880_LDS_DI | 1.334 | 0.767 | 3.948 | 749 | 288105 | 216.12% |
| azhrei_q1 | 1.834 | 1.020 | 6.905 | 545 | 396176 | 129.88% |
| baseline_q1_240 | 1.935 | 1.061 | 4.910 | 516 | 418048 | 117.86% |
| baseline_q1_240_clocked | 1.805 | 0.794 | 5.945 | 554 | 389912 | 133.67% |
| cy27_q1_480 | 1.705 | 0.631 | 7.540 | 586 | 368313 | 147.27% |
| derantrix_q1_480 | 1.659 | 0.925 | 6.450 | 602 | 358353 | 154.14% |
| dorrian_q1_480 | 1.950 | 1.323 | 5.235 | 512 | 421208 | 116.22% |
| flexime_q1_480 | 1.977 | 1.479 | 5.124 | 505 | 427009 | 113.28% |
| mcmayhem57_q1_960_max_prod | 2.631 | 2.106 | 7.282 | 380 | 568354 | 60.25% |
| mrx8024_q2_1440_v1.1 | 1.394 | 0.783 | 4.388 | 717 | 301130 | 202.44% |
| princle_2880_V1 | 2.133 | 1.640 | 5.357 | 468 | 460705 | 97.68% |
| princle_2880_V2 | 2.170 | 1.662 | 7.185 | 460 | 468629 | 94.35% |
| stupidfathobbit_q1_240 | 1.661 | 0.730 | 6.050 | 601 | 358827 | 153.81% |
| swiftdeath_q1_2880 | 1.802 | 1.069 | 7.004 | 554 | 389291 | 133.96% |
| thaeln_q1_960 | 1.479 | 0.723 | 6.480 | 676 | 319489 | 185.06% |
| thaeln_q2_960 | 1.130 | 0.682 | 4.417 | 884 | 244110 | 273.09% |
| thaeln_q2_960_railgun | 1.078 | 0.571 | 3.769 | **928** | 232749 | 291.30% |
| thaeln_q3_960 | 1.659 | 1.153 | 4.383 | 602 | 358228 | 154.23% |
| theflyingcurryfish154_q1_1920 | 1.597 | 0.610 | 6.616 | 626 | 345001 | 163.99% |
| tou_q2_2880_railgun_1_offset | 1.089 | 0.607 | 3.971 | 918 | 235146 | 287.31% |
| tou_q2_2880_railgun_2_offset | 1.107 | 0.645 | 4.017 | 903 | 239173 | 280.79% |
| yuu_q5_480_clocked | 4.217 | 3.263 | 8.221 | 237 | 910762 | 0.00% |

![run_distribution](charts/run_distribution.png)

Box and Whisker Plot:
![timeseries](charts/timeseries.png)

![metrics](charts/metrics.png)

## Conclusion