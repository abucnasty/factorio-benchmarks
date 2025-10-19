# Factorio Benchmark Results

**Platform:** windows-x86_64
**Factorio Version:** 2.0.69

## Scenario
* Each save was tested for 3600 tick(s) and 3 run(s)
* 1200 copies of the below design which produces 240/s uncommon ore
* 1014 copies of the save file called "K" which produces 284/s
* all maps have cars disabled

### Designs

All Designs: https://factoriobin.com/post/nv7lg3

| Name | Q2 Ore Output | Description                                                                         | Screenshot                                                                                                           |
| ---- | ------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| A    | 480/s         | latched on / off based on quantity in steel chests                                  | <a href="design_screenshot/design_A.png"><img src="design_screenshot/design_A.png" alt="design_A" height="100"/></a> |
| B    | 240/s         | clocked recyclers                                                                   | <a href="design_screenshot/design_B.png"><img src="design_screenshot/design_B.png" alt="design_B" height="100"/></a> |
| C    | 240/s         | same as B, no clocking                                                              | <a href="design_screenshot/design_C.png"><img src="design_screenshot/design_C.png" alt="design_C" height="100"/></a> |
| D    | 240/s         | clocked recycler never runs out of input ingredients                                | <a href="design_screenshot/design_D.png"><img src="design_screenshot/design_D.png" alt="design_D" height="100"/></a> |
| E    | 240/s         | exact machine speed (1080/s Q1 voiding)                                             | <a href="design_screenshot/design_E.png"><img src="design_screenshot/design_E.png" alt="design_E" height="100"/></a> |
| F    | 240/s         | same as E with clocked waste inserters (car to recycler)                            | <a href="design_screenshot/design_F.png"><img src="design_screenshot/design_F.png" alt="design_F" height="100"/></a> |
| G    | 240/s         | same as B with clocked waste inserters (car to recycler)                            | <a href="design_screenshot/design_G.png"><img src="design_screenshot/design_G.png" alt="design_G" height="100"/></a> |
| H    | 480/s         | v2.3.1 from The End but modified to be tileable                                     | <a href="design_screenshot/design_H.png"><img src="design_screenshot/design_H.png" alt="design_H" height="100"/></a> |
| I    | 480/s         | Same as H but larger buffers in cargo wagon                                         | <a href="design_screenshot/design_I.png"><img src="design_screenshot/design_I.png" alt="design_I" height="100"/></a> |
| J    | 480/s         | Same as I but all modulo clocks from the same single base clock                     | <a href="design_screenshot/design_J.png"><img src="design_screenshot/design_J.png" alt="design_J" height="100"/></a> |
| K    | 284/s         | always active recycler, extra lane of output for 44/s                               | <a href="design_screenshot/design_K.png"><img src="design_screenshot/design_K.png" alt="design_K" height="100"/></a> |
| L    | 480/s         | Same as I with 3 Q5 stack inserters to belt instead of 4 Q4 stack inserters to belt | <a href="design_screenshot/design_L.png"><img src="design_screenshot/design_L.png" alt="design_L" height="100"/></a> |

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

| Save            | Avg (ms) | Min (ms) | Max (ms) | UPS     | Execution Time (ms) |
| --------------- | -------- | -------- | -------- | ------- | ------------------- |
| bm_ore_voider_C | 9.630    | 7.203    | 17.851   | 103     | 208007              |
| bm_ore_voider_A | 9.493    | 8.843    | 18.440   | 105     | 205040              |
| bm_ore_voider_E | 8.559    | 5.686    | 15.877   | 116     | 184876              |
| bm_ore_voider_K | 8.419    | 7.400    | 18.148   | 118     | 181863              |
| bm_ore_voider_D | 8.095    | 1.889    | 22.515   | 123     | 174846              |
| bm_ore_voider_B | 7.965    | 1.263    | 18.775   | 125     | 172043              |
| bm_ore_voider_F | 7.930    | 5.742    | 15.086   | 126     | 171286              |
| bm_ore_voider_G | 7.819    | 1.029    | 18.257   | 127     | 168886              |
| bm_ore_voider_J | 7.757    | 3.255    | 16.397   | 128     | 167545              |
| bm_ore_voider_H | 7.735    | 3.682    | 20.902   | 129     | 167084              |
| bm_ore_voider_I | 7.725    | 3.274    | 17.029   | 129     | 166856              |
| bm_ore_voider_L | 7.681    | 2.869    | 17.044   | **130** | 165902              |

![summary_verbose_metrics_all_designs_table.png](summary_verbose_metrics_all_designs_table.png)
![summary_run_distribution_all.png](summary_run_distribution_all.png)

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

### Design H
![alt text](timeseries_voider_H.png)

### Design I
![alt text](timeseries_voider_I.png)

### Design J
![alt text](timeseries_voider_J.png)

### Design K
![alt text](timeseries_voider_K.png)

### Design L
![alt text](timeseries_voider_L.png)


### Recycler Profiler Analysis
@Yuu6883 ran a profiler to analyze what the hot code paths of the recyler. 1.5k samples out of 10k are spent calculating the production statistics while voiding ore.

![alt text](images/recycler-profiler.png)

This explains one reason batching these statistic updates per tick as much as possible has a benefit to recycler time.

One note from the above profile is that the quality roll is a very low impact compared to the actual inventory updates and statistic updates.

## Conclusion
- Overbeaconed recyclers
  - improve per tick voiding
  - suffer when not clocked due to inserters not having backpressure when inserting into the recyclers
  - start / stops are very frequent on recyclers allowing them to not void as much per tick as they possibly could if not clocked
- Constant production on recyclers
  - having constant production on recyclers is better than overbeaconed and no clocking due to backpressure on inserters
- Clocked recyclers with overbeaconed gains the benefit of per tick ore voiding reduction while 