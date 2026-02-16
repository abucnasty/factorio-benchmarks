# Factorio Benchmark Results

**Platform:** windows-x86_64

**Factorio Version:** 2.0.72

## The Question
How do the automatically generated clocks from [clock-generator](https://github.com/abucnasty/factorio-scripts/tree/master/clock-generator) compare to manually created clocks or lead follow control of the past?

## Conclusion
The auto generated clocks outperforms the traditional clocks used in the past in these designs.

Given the fact that the clocks could be automatically generated without manually configuring the clocks proves that the tool is viable for at least the designs that were tested.

The largest impact that is observed is the ability to rapidly prototype a clock for complex ratios such as the inserter production chain on green science. Historically, designers have been hesitant to clock this type of a build given the 175% productivity bonus in green circuit EM plants and have normally left them unclocked. Historically, the conclusion has been drawn that these builds are best left not clocked, but this seems to not be the case now.

## Scenario
-  Each save was tested for 18000 tick(s) and 6 run(s)
-  red science is 312 lanes (74880 sps)
-  green science is 192 lanes (46080 sps)
   -  for green science, 2 new versions are proposed. One with inserter production fully clocked and the other without clocking the inserter production module
-  blue science is 96 lanes (23040 sps)
-  maps labeled `gen` are generated with auto generated clocks using the [clock-generator](https://github.com/abucnasty/factorio-scripts/tree/master/clock-generator) tool
-  only A / B comparisons will be made

## Run Distribution
![alt text](charts/summary_run_distribution_all.png)

## Red Science Results
![alt text](charts/summary_red.png)
| Save File      | Entity Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Transport Lines Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| -------------- | ------------- | ----------------------- | ---------------------------------- | ---------------------- | ----- | ------------ | ------------------------ | -------------------- |
| red_gen_clocks | 715           | 92                      | 91                                 | 80                     | 27    | 1005         |                          | 0%                   |
| red_old_clocks | 722           | 97                      | 92                                 | 83                     | 26    | 1020         | -1.47%                   | -1.47%               |

## Green Science Results
Version 1.1 and 1.2 are both automatically generated. Version 1.1 has no clocking for the inserter production module, where as 1.2 does have clocking.

![alt text](images/green_science_clocks.png)

The following plan was generated for version 1.2 for the inserter production module.
![alt text](images/green_version_1_2_plan.png)

One thing that should be noted is that the copper wire clock was not exactly accurate as the captured period cuts short, reducing the number of swings on the copper wires and gear inserters on the 11th of the 48 tick cycles. To compensate, the range of the copper wire was extended manually, otherwise all clocks were left untouched.

![alt text](charts/summary_green.png)

| Save File            | Entity Update | Control Behavior Update | Transport Lines Update | Electric/Heat/Fluid Circuit Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| -------------------- | ------------- | ----------------------- | ---------------------- | ---------------------------------- | ----- | ------------ | ------------------------ | -------------------- |
| green_gen_clocks_1.2 | 846           | 83                      | 79                     | 69                                 | 24    | 1102         |                          | 0%                   |
| green_gen_clocks_1.1 | 890           | 71                      | 79                     | 70                                 | 25    | 1135         | -3.01%                   | -3.01%               |
| green_old_clocks     | 886           | 110                     | 80                     | 75                                 | 25    | 1176         | -3.66%                   | -6.78%               |

## Blue Science Results
![alt text](charts/summary_blue.png)
| Save File       | Entity Update | Control Behavior Update | Transport Lines Update | Electric/Heat/Fluid Circuit Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| --------------- | ------------- | ----------------------- | ---------------------- | ---------------------------------- | ----- | ------------ | ------------------------ | -------------------- |
| blue_gen_clocks | 758           | 108                     | 85                     | 82                                 | 28    | 1062         |                          | 0%                   |
| blue_old_clocks | 771           | 108                     | 91                     | 84                                 | 28    | 1083         | -1.95%                   | -1.95%               |

## Verbose Timeseries Charts
![alt text](charts/timeseries_red_gen_clocks.png) 
![alt text](charts/timeseries_red_old_clocks.png)
![alt text](charts/timeseries_green_gen_clocks_1.2.png) 
![alt text](charts/timeseries_green_gen_clocks_1.1.png) 
![alt text](charts/timeseries_green_old_clocks.png)
![alt text](charts/timeseries_blue_gen_clocks.png) 
![alt text](charts/timeseries_blue_old_clocks.png) 


