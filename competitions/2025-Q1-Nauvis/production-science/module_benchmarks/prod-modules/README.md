# Production Modules

**Platform:** windows-x86_64

**Factorio Version:** 2.0.72

## Scenario
* Each save was tested for 24000 tick(s) and 24 run(s)
* 80 copies of 160/s prod modules (total of 384k / min)
* all design blueprints are [here](./blueprints.txt)
* all designs are throttled to 160/s with circuit controlled inserters

## Results
![alt text](charts/summary_run_distribution_all_2_sigma.png)

![alt text](charts/summary_verbose_metrics_average_all_designs.png)

| Save File                   | Entity Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Transport Lines Update | Trains | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| --------------------------- | ------------- | ----------------------- | ---------------------------------- | ---------------------- | ------ | ----- | ------------ | ------------------------ | -------------------- |
| 160_akaravortex_v7          | 893           | 85                      | 73                                 | 50                     | 0      | 26    | 1127         |                          | 0%                   |
| 160_akaravortex             | 891           | 88                      | 73                                 | 50                     | 0      | 26    | 1128         | -0.11%                   | -0.11%               |
| 160_theflyingcuryfish154_v2 | 901           | 112                     | 72                                 | 52                     | 0      | 26    | 1163         | -3.09%                   | -3.2%                |
| 160_thaeln_akarra           | 930           | 91                      | 74                                 | 49                     | 0      | 26    | 1169         | -0.56%                   | -3.78%               |
| 160_teaz_akara_clocks_v6    | 932           | 91                      | 72                                 | 54                     | 0      | 26    | 1174         | -0.44%                   | -4.24%               |
| 80_thaeln_cars              | 922           | 99                      | 79                                 | 51                     | 0      | 26    | 1178         | -0.27%                   | -4.52%               |
| 160_teaz                    | 900           | 130                     | 72                                 | 64                     | 0      | 26    | 1192         | -1.25%                   | -5.83%               |
| 160_warbaque                | 950           | 102                     | 67                                 | 50                     | 0      | 27    | 1197         | -0.41%                   | -6.26%               |
| 160_theflyingcuryfish154    | 918           | 132                     | 81                                 | 49                     | 0      | 27    | 1207         | -0.77%                   | -7.08%               |
| 80_thaeln                   | 968           | 96                      | 80                                 | 52                     | 0      | 26    | 1223         | -1.32%                   | -8.5%                |
| 80_theend                   | 959           | 88                      | 105                                | 49                     | 0      | 27    | 1227         | -0.37%                   | -8.9%                |
| 80_swiftdeath007            | 978           | 104                     | 70                                 | 53                     | 0      | 26    | 1232         | -0.37%                   | -9.3%                |
| 80_geist                    | 958           | 136                     | 93                                 | 55                     | 0      | 27    | 1269         | -3.04%                   | -12.63%              |
| 160_abuc                    | 1003          | 122                     | 66                                 | 51                     | 0      | 27    | 1270         | -0.05%                   | -12.69%              |
| 80_mcmayhem57               | 1061          | 104                     | 83                                 | 51                     | 52     | 26    | 1378         | -8.49%                   | -22.26%              |
| 40_teaz                     | 1262          | 49                      | 77                                 | 58                     | 0      | 26    | 1472         | -6.84%                   | -30.62%              |
| 160_azhrei                  | 1149          | 106                     | 102                                | 70                     | 27     | 28    | 1483         | -0.73%                   | -31.58%              |

## Major Steps of Performance Improvement

### Belted Red Circuits and No clocking
| Save File  | Entity Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Transport Lines Update | Trains | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| ---------- | ------------- | ----------------------- | ---------------------------------- | ---------------------- | ------ | ----- | ------------ | ------------------------ | -------------------- |
| 40_teaz    | 1262          | 49                      | 77                                 | 58                     | 0      | 26    | 1472         |                          | -30.62%              |
| 160_azhrei | 1149          | 106                     | 102                                | 70                     | 27     | 28    | 1483         | -0.73%                   | -31.58%              |

`160_azhrei` belts red circuits and `40_teaz` has no clocking but is fully DI.


### Excessive Chest Chaining
| Save File     | Entity Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Transport Lines Update | Trains | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| ------------- | ------------- | ----------------------- | ---------------------------------- | ---------------------- | ------ | ----- | ------------ | ------------------------ | -------------------- |
| 80_geist      | 958           | 136                     | 93                                 | 55                     | 0      | 27    | 1269         |                          | -12.63%              |
| 160_abuc      | 1003          | 122                     | 66                                 | 51                     | 0      | 27    | 1270         | -0.05%                   | -12.69%              |
| 80_mcmayhem57 | 1061          | 104                     | 83                                 | 51                     | 52     | 26    | 1378         | -8.49%                   | -22.26%              |

These three designs use a chest buffer for plastic and copper wire. The main difference in performance improvement from mcmayhem57's design to the other two comes down to clocking the higher wake list inserters.

Specifically, the better inserters to clock were the inputs to advanced circuit and all inserters to prod module EM plants. This is due to the high craft events causing wake events to trigger inserters 15 times per second for productivity modules and over 45 times per second for advanced circuits.

### The 1% Club
| Save File                   | Entity Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Transport Lines Update | Trains | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| --------------------------- | ------------- | ----------------------- | ---------------------------------- | ---------------------- | ------ | ----- | ------------ | ------------------------ | -------------------- |
| 160_akaravortex_v7          | 893           | 85                      | 73                                 | 50                     | 0      | 26    | 1127         |                          |                      |
| 160_akaravortex             | 891           | 88                      | 73                                 | 50                     | 0      | 26    | 1128         | -0.11%                   | -0.11%               |
| 160_theflyingcuryfish154_v2 | 901           | 112                     | 72                                 | 52                     | 0      | 26    | 1163         | -3.09%                   | -3.2%                |
| 160_thaeln_akarra           | 930           | 91                      | 74                                 | 49                     | 0      | 26    | 1169         | -0.56%                   | -3.78%               |
| 160_teaz_akara_clocks_v6    | 932           | 91                      | 72                                 | 54                     | 0      | 26    | 1174         | -0.44%                   | -4.24%               |
| 80_thaeln_cars              | 922           | 99                      | 79                                 | 51                     | 0      | 26    | 1178         | -0.27%                   | -4.52%               |
| 160_teaz                    | 900           | 130                     | 72                                 | 64                     | 0      | 26    | 1192         | -1.25%                   | -5.83%               |
| 160_warbaque                | 950           | 102                     | 67                                 | 50                     | 0      | 27    | 1197         | -0.41%                   | -6.26%               |
| 160_theflyingcuryfish154    | 918           | 132                     | 81                                 | 49                     | 0      | 27    | 1207         | -0.77%                   | -7.08%               |
| 80_thaeln                   | 968           | 96                      | 80                                 | 52                     | 0      | 26    | 1223         | -1.32%                   | -8.5%                |
| 80_theend                   | 959           | 88                      | 105                                | 49                     | 0      | 27    | 1227         | -0.37%                   | -8.9%                |
| 80_swiftdeath007            | 978           | 104                     | 70                                 | 53                     | 0      | 26    | 1232         | -0.37%                   | -9.3%                |

These designs made iterative improvements to clocking and removing chest chaining wherever possible.

The top three designs are all fully DI.

### Cars

A separate test was conducted after realizing that swapping out a 3 inserter chest chain from green to red circuits was worse with a car.

![alt text](thaeln_cars_comparison/charts/summary_verbose_metrics_thaeln_cars_table.png)
| Save File                             | Entity Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Transport Lines Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| ------------------------------------- | ------------- | ----------------------- | ---------------------------------- | ---------------------- | ----- | ------------ | ------------------------ | -------------------- |
| 80_thaeln_cars_green_clocked_one_slot | 912           | 98                      | 72                                 | 48                     | 25    | 1155         |                          | 0%                   |
| 80_thaeln_cars_green_clocked          | 929           | 98                      | 71                                 | 47                     | 25    | 1170         | -1.25%                   | -1.25%               |
| 80_thaeln_cars                        | 969           | 93                      | 70                                 | 47                     | 25    | 1204         | -2.92%                   | -4.21%               |


These tests found that clocking the inputs to a car was better than leaving it on a wakelist. The working theory is that by guarding the circuit, it isn't checking if the car is moving every tick. The cars were disabled via a console command.

## Conclusion
- Direct insertion was better than inserter chains
- Clocking high craft update items saw major improvements
- Clocking inputs to green circuits for example was worse
- Clocking inputs to a car in a chest chain is better than leaving it relying on wakelists (presumably due to it constantly checking if the car is moving)