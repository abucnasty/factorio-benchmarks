# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.72

## Scenario
* Each save was tested for 7200 tick(s) and 3 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| bm_1_lane_2_miners_speed_64000 | 4.505 | 0.982 | 1985.211 | 224 | 97313 | 0.00% |
| bm_1_lane_2_miners_speed_32000 | 4.169 | 0.965 | 992.805 | 242 | 90055 | 7.81% |
| bm_1_lane_2_miners_speed_4000 | 4.085 | 0.960 | 130.021 | 246 | 88237 | 9.65% |
| bm_1_lane_2_miners_efficiency_1000 | 4.074 | 1.002 | 13.618 | 249 | 88000 | 10.90% |
| bm_1_lane_2_miners_efficiency_2000 | 4.042 | 0.964 | 16.224 | 250 | 87312 | 11.63% |
| bm_1_lane_2_miners_speed_16000 | 4.021 | 0.945 | 501.921 | 251 | 86852 | 11.97% |
| bm_1_lane_2_miners_efficiency_64000 | 4.029 | 0.956 | 331.671 | 251 | 87023 | 12.12% |
| bm_1_lane_2_miners_efficiency_4000 | 4.005 | 0.942 | 25.540 | 253 | 86505 | 12.77% |
| bm_1_lane_2_miners_efficiency_32000 | 3.987 | 0.946 | 177.311 | 255 | 86123 | 13.56% |
| bm_1_lane_2_miners_speed_1000 | 3.975 | 0.957 | 37.367 | 255 | 85865 | 13.57% |
| bm_1_lane_2_miners_efficiency_16000 | 3.961 | 0.936 | 88.342 | 255 | 85553 | 13.85% |
| bm_1_lane_2_miners_efficiency_8000 | 3.962 | 0.934 | 47.178 | 255 | 85575 | 13.95% |
| bm_1_lane_2_miners_speed_8000 | 3.940 | 0.957 | 253.242 | 256 | 85112 | 14.18% |
| bm_1_lane_2_miners_speed_2000 | 3.749 | 0.961 | 67.329 | **266** | 80981 | 18.90% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion