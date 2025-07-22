# Factorio Benchmark Results

**Platform:** windows-x86_64  
**Factorio Version:** 2.0.60  

## Scenario
* Each save was tested for 3600 tick(s) and 5 run(s)

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) |
|------|----------|----------|----------|-----|---------------------|
| biolab_uncontrolled | 0.458 | 0.268 | 1.439 | 2184 | 8240 |
| abuc | 0.328 | 0.174 | 0.860 | 3048 | 5904 |
| biolab_synchronous | 0.313 | 0.185 | 1.849 | **3191** | 5642 |

![result_0_chart.svg](result_0_chart.svg)

Box and Whisker Plot:
![result_1_chart.svg](result_1_chart.svg)

| Save | % Difference from base |
|------|------------------------|
| biolab_uncontrolled | 0.00% |
| abuc | 39.55% |
| biolab_synchronous | 46.05% |

![result_2_chart.svg](result_2_chart.svg)

## Verbose Metrics
### Control Behaviour Update
![benchmark_abuc_controlBehaviorUpdate_min_per_tick](benchmark_abuc_controlBehaviorUpdate_min_per_tick.svg)
![benchmark_biolab_synchronous_controlBehaviorUpdate_min_per_tick](benchmark_biolab_synchronous_controlBehaviorUpdate_min_per_tick.svg)
![benchmark_biolab_uncontrolled_controlBehaviorUpdate_min_per_tick](benchmark_biolab_uncontrolled_controlBehaviorUpdate_min_per_tick.svg)

### Entity Update
![benchmark_abuc_entityUpdate_min_per_tick](benchmark_abuc_entityUpdate_min_per_tick.svg)
![benchmark_biolab_synchronous_entityUpdate_min_per_tick](benchmark_biolab_synchronous_entityUpdate_min_per_tick.svg)
![benchmark_biolab_uncontrolled_entityUpdate_min_per_tick](benchmark_biolab_uncontrolled_entityUpdate_min_per_tick.svg)

### Transport Line Update

![benchmark_abuc_transportLinesUpdate_min_per_tick](benchmark_abuc_transportLinesUpdate_min_per_tick.svg)
![benchmark_biolab_synchronous_transportLinesUpdate_min_per_tick](benchmark_biolab_synchronous_transportLinesUpdate_min_per_tick.svg)
![benchmark_biolab_uncontrolled_transportLinesUpdate_min_per_tick](benchmark_biolab_uncontrolled_transportLinesUpdate_min_per_tick.svg)

### Whole Update
![benchmark_abuc_wholeUpdate_min_per_tick](benchmark_abuc_wholeUpdate_min_per_tick.svg)
![benchmark_biolab_synchronous_wholeUpdate_min_per_tick](benchmark_biolab_synchronous_wholeUpdate_min_per_tick.svg)
![benchmark_biolab_uncontrolled_wholeUpdate_min_per_tick](benchmark_biolab_uncontrolled_wholeUpdate_min_per_tick.svg)