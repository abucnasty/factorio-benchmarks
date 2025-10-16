# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.69

## Scenario
* Each save was tested for 3600 tick(s) and 3 run(s)
* 1200 copies of the below design which produces 240/s uncommon ore
* 1014 copies of the save file called "K" which produces 284/s
* all maps have cars disabled

### Designs

All Designs: https://factoriobin.com/post/i29kkc

| Name | Q2 Ore Output | Description                                              | Screenshot                                                                                                           |
| ---- | ------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| A    | 480/s         | latched on / off based on quantity in steel chests       | <a href="design_screenshot/design_A.png"><img src="design_screenshot/design_A.png" alt="design_A" height="100"/></a> |
| B    | 240/s         | clocked recyclers                                        | <a href="design_screenshot/design_B.png"><img src="design_screenshot/design_B.png" alt="design_B" height="100"/></a> |
| C    | 240/s         | same as B, no clocking                                   | <a href="design_screenshot/design_C.png"><img src="design_screenshot/design_C.png" alt="design_C" height="100"/></a> |
| D    | 240/s         | clocked recycler never runs out of input ingredients     | <a href="design_screenshot/design_D.png"><img src="design_screenshot/design_D.png" alt="design_D" height="100"/></a> |
| E    | 240/s         | exact machine speed (1080/s Q1 voiding)                  | <a href="design_screenshot/design_E.png"><img src="design_screenshot/design_E.png" alt="design_E" height="100"/></a> |
| F    | 240/s         | same as E with clocked waste inserters (car to recycler) | <a href="design_screenshot/design_F.png"><img src="design_screenshot/design_F.png" alt="design_F" height="100"/></a> |
| G    | 240/s         | same as B with clocked waste inserters (car to recycler) | <a href="design_screenshot/design_G.png"><img src="design_screenshot/design_G.png" alt="design_G" height="100"/></a> |
| K    | 284/s         | always active recycler, extra lane of output for 44/s    | <a href="design_screenshot/design_K.png"><img src="design_screenshot/design_K.png" alt="design_K" height="100"/></a> |

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save            | Avg (ms) | Min (ms) | Max (ms) | UPS     | Execution Time (ms) | % Difference from Worst |
| --------------- | -------- | -------- | -------- | ------- | ------------------- | ----------------------- |
| bm_ore_voider_C | 9.746    | 7.251    | 20.533   | 102     | 105254              | 0.00%                   |
| bm_ore_voider_A | 9.488    | 8.921    | 20.995   | 105     | 102472              | 2.73%                   |
| bm_ore_voider_E | 8.665    | 5.679    | 19.938   | 115     | 93583               | 12.49%                  |
| bm_ore_voider_K | 8.632    | 7.447    | 18.433   | 115     | 93223               | 12.92%                  |
| bm_ore_voider_D | 8.174    | 1.881    | 22.337   | 122     | 88275               | 19.26%                  |
| bm_ore_voider_F | 8.003    | 5.642    | 15.538   | 124     | 86438               | 21.78%                  |
| bm_ore_voider_B | 7.985    | 1.246    | 16.269   | **125** | 86244               | 22.05%                  |

![summary_verbose_metrics_all_designs_table.png](summary_verbose_metrics_all_designs_table.png)

## Designs

### Design A
![alt text](timeseries_voider_A.png)

### Design B
![alt text](timeseries_voider_B.png)

### Design C
![alt text](timeseries_voider_C.png)

### Design D
![alt text](timeseries_voider_D.png)

### Design E
![alt text](timeseries_voider_E.png)

### Design F
![alt text](timeseries_voider_F.png)

### Design G
![alt text](timeseries_voider_G.png)

### Design K
![alt text](timeseries_voider_K.png)

## Conclusion

- Voiding more ore batched per tick is better than (minor)
- rapid starts / stops on recyclers expensive (major)