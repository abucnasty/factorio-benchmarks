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
| bm_particles_editor_open_primary_surface | 0.277 | 0.110 | 0.730 | 3607 | 9980 | 0.00% |
| bm_particles_editor_closed_other_surface | 0.220 | 0.106 | 1.817 | 4553 | 7906 | 26.23% |
| bm_particles_editor_closed_primary_surface | 0.218 | 0.103 | 0.550 | 4586 | 7849 | 27.15% |
| bm_particles_editor_open_other_surface | 0.212 | 0.112 | 0.563 | **4719** | 7627 | 30.84% |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

![result_2_chart.svg](result_2_chart.svg)

## Conclusion