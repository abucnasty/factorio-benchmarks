# Factorio Benchmark Results

**Platform:** linux-x86_64
**Factorio Version:** 2.1.6
**Date:** 2026-06-22

foo

## Scenario
* Each save was tested for 3600 tick(s) and 50 run(s)

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from base |
|------|----------|----------|----------|-----|---------------------|------------------------|
| loop_16_circuit_enabled_if_one_2_1_6 | 0.060 | 0.035 | 2201065.000 | 16562 | 10870 | 1.04% |
| loop_16_circuit_enabled_zero_2_1_6 | 0.061 | 0.034 | 1827464.000 | 16541 | 10884 | 0.91% |
| loop_16_circuit_no_condition_2_1_6 | 0.060 | 0.034 | 1383043.000 | **16625** | 10828 | 1.42% |
| loop_16_no_circuit_2_1_6 | 0.061 | 0.034 | 1070432.000 | 16392 | 10985 | 0.00% |

## Conclusion