<h1>Q1 Production Science Competition: Furnaces</h1>

<h2> Table of Contents</h2>

- [Test Environment](#test-environment)
- [The Question](#the-question)
- [Conclusion](#conclusion)
- [Scenario](#scenario)
- [Results](#results)
  - [All Designs](#all-designs)
  - [On Patch Designs](#on-patch-designs)
  - [Belted Stone Designs](#belted-stone-designs)
  - [Inserter Clocking 3 Furnace Layout](#inserter-clocking-3-furnace-layout)
  - [Inserter Clocking 2 Furnace Layout](#inserter-clocking-2-furnace-layout)
- [Clocking Mining Drills](#clocking-mining-drills)

## Test Environment
**Platform:** linux-x86_64

**Factorio Version:** 2.0.76

**Date:** 2026-04-10

## The Question
- for the production of furnaces in production science, which of the following strategies are superior and by how much:
  - on patch stone
  - belted stone
- are larger patch sizes superior
- what inserters should be clocked or not clocked

## Conclusion
  - clocking:
    - stone from belt is not worth clocking
    - stone brick output is worth clocking
    - red circuits is worth clocking
    - steel DI from foundry is not worth clocking
  - direct insertion mining:
    - clocking miners is worth it
    - direct insertion mining is far superior to belt fed stone

## Scenario
- Each save was tested for 36_000 tick(s) and 6 run(s)
- Each save produces 384_000 furnaces per minute

All blueprints for the designs in this test are here: [blueprints](../benchmarks/furnaces/blueprints.txt)

## Results

### All Designs
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

![alt text](../benchmarks/furnaces/charts/summary_run_distribution_all.png)

![alt text](../benchmarks/furnaces/charts/summary_verbose_metrics_all_table.png)

| Save                                                                        | Avg (ms) | Min (ms) | Max (ms) | UPS      | Execution Time (ms) | % Difference from Worst |
| --------------------------------------------------------------------------- | -------- | -------- | -------- | -------- | ------------------- | ----------------------- |
| bm_furnaces_40_belted_17_akaravortex                                        | 0.663    | 0.122    | 5.408    | 1508     | 71573               | 0.00%                   |
| bm_furnaces_40_belted_08_derantrix                                          | 0.645    | 0.107    | 4.006    | 1549     | 69717               | 2.67%                   |
| bm_furnaces_160_belted_abuc_3_furnace_v1.4                                  | 0.639    | 0.091    | 6.291    | 1564     | 69025               | 3.69%                   |
| bm_furnaces_160_belted_abuc_3_furnace_v1.3                                  | 0.638    | 0.095    | 6.510    | 1566     | 68927               | 3.84%                   |
| bm_furnaces_80_belted_abuc_v1.1                                             | 0.636    | 0.139    | 4.411    | 1573     | 68626               | 4.30%                   |
| bm_furnaces_40_belted_abuc_v1.1                                             | 0.632    | 0.118    | 5.423    | 1580     | 68315               | 4.77%                   |
| bm_furnaces_160_belted_abuc_3_furnace_v1.2                                  | 0.631    | 0.161    | 6.601    | 1584     | 68142               | 5.04%                   |
| bm_furnaces_40_belted_abuc_v1.0                                             | 0.626    | 0.191    | 5.641    | 1597     | 67607               | 5.87%                   |
| bm_furnaces_160_belted_abuc_3_furnace_v1.0                                  | 0.625    | 0.104    | 6.410    | 1599     | 67535               | 5.98%                   |
| bm_furnaces_80_belted_abuc_v1.2                                             | 0.623    | 0.083    | 3.706    | 1603     | 67344               | 6.28%                   |
| bm_furnaces_80_belted_24_syvkal                                             | 0.620    | 0.095    | 6.177    | 1612     | 66975               | 6.87%                   |
| bm_furnaces_40_belted_abuc_v1.2                                             | 0.617    | 0.086    | 4.120    | 1621     | 66605               | 7.46%                   |
| bm_furnaces_160_belted_21_em                                                | 0.616    | 0.102    | 6.578    | 1622     | 66547               | 7.55%                   |
| bm_furnaces_80_belted_23_warbaque                                           | 0.615    | 0.128    | 11.804   | 1627     | 66360               | 7.86%                   |
| bm_furnaces_80_belted_warbaque_11b                                          | 0.593    | 0.175    | 5.143    | 1686     | 64042               | 11.76%                  |
| bm_furnaces_80_belted_warbaque_11b_mirrorable_clocked_stone                 | 0.590    | 0.081    | 4.473    | 1693     | 63775               | 12.23%                  |
| bm_furnaces_80_belted_warbaque_11b_mirrorable                               | 0.588    | 0.070    | 2.242    | 1701     | 63463               | 12.78%                  |
| bm_furnaces_80_belted_warbaque_11b_mirrorable_steel_unclocked               | 0.586    | 0.077    | 3.684    | 1705     | 63319               | 13.04%                  |
| bm_furnaces_80_belted_warbaque_11b_mirrorable_steel_unclocked_4_slot_buffer | 0.581    | 0.075    | 5.435    | 1720     | 62759               | 14.05%                  |
| bm_furnaces_40_on_patch_19_akaravortex                                      | 0.510    | 0.160    | 38.526   | 1961     | 55057               | 30.00%                  |
| bm_furnaces_40_on_patch_06_mulain                                           | 0.486    | 0.073    | 8.612    | 2055     | 52540               | 36.23%                  |
| bm_furnaces_40_on_patch_abuc_v2.0                                           | 0.485    | 0.082    | 11.239   | 2061     | 52398               | 36.63%                  |
| bm_furnaces_40_on_patch_abuc_v2.1                                           | 0.471    | 0.073    | 9.528    | 2123     | 50872               | 40.72%                  |
| bm_furnaces_40_on_patch_abuc_v2.2                                           | 0.464    | 0.066    | 10.187   | 2156     | 50086               | 42.90%                  |
| bm_furnaces_40_on_patch_v6_akaravortex                                      | 0.461    | 0.102    | 37.473   | 2169     | 49797               | 43.75%                  |
| bm_furnaces_160_on_patch_em_thaeln_clocks                                   | 0.457    | 0.121    | 8.722    | 2188     | 49360               | 45.01%                  |
| bm_furnaces_160_on_patch_em_abuc_clocks                                     | 0.454    | 0.122    | 12.273   | 2200     | 49080               | 45.83%                  |
| bm_furnaces_80_on_patch_11_thaeln                                           | 0.449    | 0.067    | 17.027   | **2224** | 48552               | 47.42%                  |


### On Patch Designs
![alt text](../benchmarks/furnaces/charts/summary_verbose_metrics_on_patch_table.png)
| Save File                     | Entity Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Transport Lines Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| ----------------------------- | ------------- | ----------------------- | ---------------------------------- | ---------------------- | ----- | ------------ | ------------------------ | -------------------- |
| 160_on_patch_em_abuc_clocks   | 364           | 32                      | 23                                 | 22                     | 12    | 453          |                          | 0%                   |
| 160_on_patch_em_thaeln_clocks | 368           | 31                      | 23                                 | 22                     | 12    | 456          | -0.71%                   | -0.71%               |
| 80_on_patch_11_thaeln         | 367           | 31                      | 26                                 | 22                     | 13    | 459          | -0.45%                   | -1.16%               |
| 40_on_patch_v6_akaravortex    | 362           | 34                      | 28                                 | 23                     | 13    | 459          | -0.15%                   | -1.31%               |
| 40_on_patch_abuc_v2.2         | 367           | 34                      | 28                                 | 22                     | 13    | 465          | -1.19%                   | -2.51%               |
| 40_on_patch_abuc_v2.1         | 372           | 37                      | 28                                 | 22                     | 13    | 472          | -1.54%                   | -4.09%               |
| 40_on_patch_06_mulain         | 384           | 33                      | 30                                 | 24                     | 13    | 485          | -2.85%                   | -7.05%               |
| 40_on_patch_abuc_v2.0         | 388           | 35                      | 28                                 | 22                     | 13    | 486          | -0.22%                   | -7.28%               |
| 40_on_patch_19_akaravortex    | 405           | 36                      | 31                                 | 24                     | 13    | 508          | -4.47%                   | -12.08%              |

### Belted Stone Designs
![alt text](../benchmarks/furnaces/charts/summary_verbose_metrics_belted_table.png)
| Save File                                                       | Entity Update | Transport Lines Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| --------------------------------------------------------------- | ------------- | ---------------------- | ----------------------- | ---------------------------------- | ----- | ------------ | ------------------------ | -------------------- |
| 80_belted_warbaque_11b_mirrorable_steel_unclocked_4_slot_buffer | 486           | 36                     | 28                      | 28                                 | 13    | 591          |                          | 0%                   |
| 80_belted_warbaque_11b                                          | 485           | 35                     | 30                      | 28                                 | 13    | 591          | -0.04%                   | -0.04%               |
| 80_belted_warbaque_11b_mirrorable_steel_unclocked               | 490           | 36                     | 28                      | 28                                 | 13    | 596          | -0.76%                   | -0.81%               |
| 80_belted_warbaque_11b_mirrorable                               | 491           | 36                     | 30                      | 28                                 | 13    | 598          | -0.33%                   | -1.15%               |
| 80_belted_warbaque_11b_mirrorable_clocked_stone                 | 489           | 34                     | 36                      | 28                                 | 13    | 600          | -0.4%                    | -1.55%               |
| 80_belted_23_warbaque                                           | 497           | 34                     | 40                      | 29                                 | 13    | 613          | -2.08%                   | -3.66%               |
| 160_belted_21_em                                                | 506           | 37                     | 38                      | 26                                 | 13    | 620          | -1.13%                   | -4.83%               |
| 40_belted_abuc_v1.0                                             | 506           | 42                     | 33                      | 30                                 | 13    | 624          | -0.63%                   | -5.5%                |
| 160_belted_abuc_3_furnace_v1.0                                  | 517           | 34                     | 35                      | 26                                 | 13    | 625          | -0.17%                   | -5.68%               |
| 40_belted_abuc_v1.2                                             | 501           | 42                     | 40                      | 30                                 | 13    | 626          | -0.24%                   | -5.94%               |
| 80_belted_abuc_v1.2                                             | 508           | 41                     | 37                      | 28                                 | 13    | 627          | -0.1%                    | -6.05%               |
| 80_belted_24_syvkal                                             | 511           | 43                     | 31                      | 29                                 | 13    | 627          | -0.08%                   | -6.13%               |
| 160_belted_abuc_3_furnace_v1.2                                  | 521           | 34                     | 37                      | 26                                 | 13    | 631          | -0.55%                   | -6.71%               |
| 40_belted_abuc_v1.1                                             | 509           | 41                     | 37                      | 31                                 | 13    | 631          | -0.04%                   | -6.76%               |
| 80_belted_abuc_v1.1                                             | 516           | 42                     | 34                      | 28                                 | 13    | 634          | -0.46%                   | -7.25%               |
| 160_belted_abuc_3_furnace_v1.3                                  | 531           | 36                     | 30                      | 26                                 | 13    | 636          | -0.33%                   | -7.61%               |
| 160_belted_abuc_3_furnace_v1.4                                  | 534           | 36                     | 28                      | 26                                 | 13    | 637          | -0.17%                   | -7.79%               |
| 40_belted_08_derantrix                                          | 530           | 37                     | 35                      | 32                                 | 13    | 647          | -1.52%                   | -9.43%               |
| 40_belted_17_akaravortex                                        | 507           | 60                     | 44                      | 37                                 | 13    | 661          | -2.27%                   | -11.91%              |

### Inserter Clocking 3 Furnace Layout

The following 4 save files were used to compare the differences in if clocking stone input was worth it or not:

- 160_belted_abuc_3_furnace_v1.0: all clocked. stone has 4 or 5 swings back to back
- 160_belted_abuc_3_furnace_v1.2: all clocked. stone has 2 or 3 swings back to back
- 160_belted_abuc_3_furnace_v1.3: stone inserter no clocking
- 160_belted_abuc_3_furnace_v1.4: stone & steel inserter have no clocking

![alt text](../benchmarks/furnaces/charts/summary_verbose_metrics_160_belted_abuc_3_furnace_table.png)

|Save File|Entity Update|Control Behavior Update|Transport Lines Update|Electric/Heat/Fluid Circuit Update|Other|Whole Update|% Decrease from Previous|% Decrease from Best|
|---|---|---|---|---|---|---|---|---|
|160_belted_abuc_3_furnace_v1.0|517|35|34|26|13|625||0%|
|160_belted_abuc_3_furnace_v1.2|521|37|34|26|13|631|-0.98%|-0.98%|
|160_belted_abuc_3_furnace_v1.3|531|30|36|26|13|636|-0.84%|-1.83%|
|160_belted_abuc_3_furnace_v1.4|534|28|36|26|13|637|-0.17%|-1.99%|


### Inserter Clocking 2 Furnace Layout

The following 3 saves files vary the inserter clocking methods for stone specifically in isolation.

- 40_belted_abuc_v1.0: stone inserters unclocked 
- 40_belted_abuc_v1.1: stone inserters swing 5 times back to back
- 40_belted_abuc_v1.2: stone inserters swing either 2 or 3 times

![alt text](../benchmarks/furnaces/charts/summary_verbose_metrics_40_belted_abuc_table.png)

| Save File           | Entity Update | Transport Lines Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| ------------------- | ------------- | ---------------------- | ----------------------- | ---------------------------------- | ----- | ------------ | ------------------------ | -------------------- |
| 40_belted_abuc_v1.0 | 506           | 42                     | 33                      | 30                                 | 13    | 624          |                          | 0%                   |
| 40_belted_abuc_v1.2 | 501           | 42                     | 40                      | 30                                 | 13    | 626          | -0.42%                   | -0.42%               |
| 40_belted_abuc_v1.1 | 509           | 41                     | 37                      | 31                                 | 13    | 631          | -0.77%                   | -1.19%               |

v1.2 increased control behavior update time by sending more signals to the inserters with no benefit. v1.1 did not decrease entity update time and in fact made it worse.

The best design was the original unclocked stone design proving that clocking inserters for stone inputs was not worth it.


## Clocking Mining Drills

Refer to the results from [2025-11-11-clocked-mining-drills](../../../../benchmarks/2025-11-11-clocked-mining-drills/README.md)

Conclusion: clocked mining drills directly inserting into a furnace is better due to reducing intermediate transfer every tick.