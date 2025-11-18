# Factorio Benchmark Results

**Platform:** windows-x86_64

**Factorio Version:** 2.0.72

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
| bm_prod_mod_80_thaeln_cars | 1.210 | 0.223 | 23.962 | 826 | 69672 | 0.00% |
| bm_prod_mod_80_thaeln_cars_green_clocked | 1.162 | 0.177 | 23.834 | 860 | 66964 | 4.05% |
| bm_prod_mod_80_thaeln_cars_green_clocked_one_slot | 1.150 | 0.212 | 24.119 | **869** | 66233 | 5.20% |

![charts/summary_verbose_metrics_all_table.png](charts/summary_verbose_metrics_all_table.png)

## Conclusion