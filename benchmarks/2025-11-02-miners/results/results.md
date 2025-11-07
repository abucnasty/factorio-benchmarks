# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.72

## Scenario
* Each save was tested for 36000 tick(s) and 1 run(s)

## Results
| Metric | Description |
| ----------------- | ------------------------------------- |
| **Mean UPS** | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better |
| **Mean Min (ms)** | Minimum frame time - lower is better |
| **Mean Max (ms)** | Maximum frame time - lower is better |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from Worst |
|------|----------|----------|----------|-----|---------------------| --- |
| bm_1_lane_2_miners_quality_1000_4_module | 4.410 | 2.272 | 8.821 | 226 | 158760 | 0.00% |
| bm_1_lane_2_miners_quality_2000_4_module | 4.305 | 1.665 | 13.803 | 232 | 154972 | 2.44% |
| bm_1_lane_2_miners_quality_4000_4_module | 4.097 | 1.028 | 14.993 | 244 | 147498 | 7.64% |
| bm_1_lane_2_miners_quality_4000_3_module | 4.084 | 1.008 | 17.153 | 244 | 147027 | 7.98% |
| bm_1_lane_2_miners_quality_4000_2_module | 4.029 | 1.011 | 16.629 | 248 | 145034 | 9.46% |
| bm_1_lane_2_miners_quality_8000_4_module | 4.003 | 1.010 | 26.940 | 249 | 144102 | 10.17% |
| bm_1_lane_2_miners_quality_16000_4_module | 3.953 | 0.973 | 52.677 | 253 | 142291 | 11.57% |
| bm_1_lane_2_miners_quality_32000_4_module | 3.943 | 0.957 | 102.661 | 253 | 141946 | 11.85% |
| bm_1_lane_2_miners_quality_4000_1_module | 3.861 | 0.985 | 16.227 | 258 | 138997 | 14.22% |
| bm_1_lane_2_miners_speed_32000 | 3.751 | 0.969 | 659.173 | 266 | 135041 | 17.56% |
| bm_1_lane_2_miners_speed_8000 | 3.701 | 0.970 | 177.509 | 270 | 133244 | 19.15% |
| bm_1_lane_2_miners_efficiency_1000 | 3.691 | 1.024 | 10.622 | 270 | 132886 | 19.47% |
| bm_1_lane_2_miners_prod_4000_4_module | 3.667 | 0.947 | 19.947 | 272 | 132020 | 20.25% |
| bm_1_lane_2_miners_efficiency_4000 | 3.649 | 0.954 | 18.324 | 274 | 131359 | 20.86% |
| bm_1_lane_2_miners_speed_2000 | 3.647 | 0.990 | 57.521 | 274 | 131287 | 20.93% |
| bm_1_lane_2_miners_speed_4000 | 3.642 | 0.930 | 115.368 | 274 | 131103 | 21.10% |
| bm_1_lane_2_miners_speed_16000 | 3.641 | 0.960 | 332.538 | 274 | 131069 | 21.13% |
| bm_1_lane_2_miners_prod_4000_3_module | 3.640 | 1.026 | 20.914 | 274 | 131046 | 21.15% |
| bm_1_lane_2_miners_efficiency_16000 | 3.637 | 0.944 | 59.415 | 274 | 130949 | 21.24% |
| bm_1_lane_2_miners_efficiency_8000 | 3.634 | 0.957 | 43.435 | 275 | 130806 | 21.37% |
| bm_1_lane_2_miners_efficiency_2000 | 3.631 | 0.972 | 14.559 | 275 | 130721 | 21.45% |
| bm_1_lane_2_miners_prod_4000_1_module | 3.629 | 0.944 | 22.662 | 275 | 130648 | 21.52% |
| bm_1_lane_2_miners_prod_4000_2_module | 3.627 | 0.954 | 20.457 | 275 | 130578 | 21.58% |
| bm_1_lane_2_miners_efficiency_32000 | 3.604 | 0.962 | 113.543 | 277 | 129753 | 22.36% |
| bm_1_lane_2_miners_speed_1000 | 3.576 | 0.973 | 25.752 | **279** | 128726 | 23.33% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion