# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.69

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
| bm_ore_voider_C | 9.630 | 7.203 | 17.851 | 103 | 208007 | 0.00% |
| bm_ore_voider_A | 9.493 | 8.843 | 18.440 | 105 | 205040 | 1.46% |
| bm_ore_voider_E | 8.559 | 5.686 | 15.877 | 116 | 184876 | 12.51% |
| bm_ore_voider_K | 8.419 | 7.400 | 18.148 | 118 | 181863 | 14.38% |
| bm_ore_voider_D | 8.095 | 1.889 | 22.515 | 123 | 174846 | 18.99% |
| bm_ore_voider_B | 7.965 | 1.263 | 18.775 | 125 | 172043 | 20.90% |
| bm_ore_voider_F | 7.930 | 5.742 | 15.086 | 126 | 171286 | 21.44% |
| bm_ore_voider_G | 7.819 | 1.029 | 18.257 | **127** | 168886 | 23.16% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion