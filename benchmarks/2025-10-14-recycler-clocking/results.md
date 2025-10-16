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
| bm_ore_voider_J | 7.757 | 3.255 | 16.397 | 128 | 167545 | 0.00% |
| bm_ore_voider_H | 7.735 | 3.682 | 20.902 | **129** | 167084 | 0.27% |
| bm_ore_voider_I | 7.725 | 3.274 | 17.029 | **129** | 166856 | 0.41% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion