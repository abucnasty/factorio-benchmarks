# Chest Transfer

**Platform:** windows-x86_64

**Factorio Version:** 2.0.72

## Table of Contents
- [Chest Transfer](#chest-transfer)
  - [Table of Contents](#table-of-contents)
  - [Scenario](#scenario)
  - [Terminology](#terminology)
    - [Cars / Tanks](#cars--tanks)
    - [Container Configurations](#container-configurations)
  - [5 Tiles](#5-tiles)
    - [5 Tile Results](#5-tile-results)
    - [5 Tile Results Analysis](#5-tile-results-analysis)
  - [7 Tiles](#7-tiles)
    - [7 Tile Results All](#7-tile-results-all)
    - [7 Tile Results Analysis](#7-tile-results-analysis)
  - [9 Tiles](#9-tiles)
    - [9 Tile Results All](#9-tile-results-all)
  - [5 Tiles Backpressure](#5-tiles-backpressure)
    - [5 Tile Backpressure Results](#5-tile-backpressure-results)
    - [5 Tiles Backpressure Results Analysis](#5-tiles-backpressure-results-analysis)

## Scenario
- Each save was tested for 8020 tick(s) and 3 run(s)
- Each save is paused before the transfer takes place
- 20000 input inserters and 20000 output inserters with wood chest inputs and outputs
- 16k coins are transferred from the input container to the final output container
  - coins are chosen due to their large stack size of 100000

## Terminology

### Cars / Tanks
`disabled` represents entities that are disabled via a lua console command. The following commands are used for disabling cars and tanks:

```lua
-- cars & tanks
/c for _, v in pairs(game.player.surface.find_entities_filtered{type="car"}) do
  v.active = false
end
```

### Container Configurations

`filtered` represents a container that supports filtered slots. Example:

![alt text](images/filtered.png)

`filtered_last_slot` represents a container that supports filtered slots and the last slot is left unfiltered. Example:

![alt text](images/filtered_last_slot.png)

`limited` represents a container that supports limiting the slots. Example:

![alt text](images/limited.png)

`filtered_first_slot_coin` represents a container that has the first slot filtered to the actual item being transferred, but the rest are filtered to be blocked with a destruction planner.

![alt text](images/filtered_first_slot_coin.png)


`blank / nothing` if none of the labels above are present, the slots are left in their default configuration. Example:

![alt text](images/nothing.png)


## 5 Tiles
<a href="images/5_tiles.png"><img src="images/5_tiles.png" alt="5_tiles" width="200"/></a>

This test compares different chest types, focusing mainly on how that type of chest impacts UPS as there are no differences in inserter counts between these saves.

### 5 Tile Results
![alt text](5_tiles/charts/summary_run_distribution_all.png)
![alt text](5_tiles/charts/summary_verbose_metrics_all_table.png)

| Save File                         | Entity Update | Electric/Heat/Fluid Circuit Update | Control Behavior Update | Transport Lines Update | Trains | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| --------------------------------- | ------------- | ---------------------------------- | ----------------------- | ---------------------- | ------ | ----- | ------------ | ------------------------ | -------------------- |
| wood_chest_limited                | 1710          | 81                                 | 47                      | 43                     | 0      | 21    | 1902         |                          |                      |
| steel_chest_limited               | 1724          | 79                                 | 44                      | 40                     | 0      | 20    | 1908         | -0.32%                   | -0.3%                |
| iron_chest_limited                | 1725          | 79                                 | 44                      | 40                     | 0      | 20    | 1909         | -0.05%                   | -0.35%               |
| wood_chest                        | 1725          | 81                                 | 48                      | 43                     | 0      | 21    | 1919         | -0.52%                   | -0.88%               |
| steel_chest                       | 1736          | 79                                 | 44                      | 40                     | 0      | 20    | 1920         | -0.05%                   | -0.93%               |
| iron_chest                        | 1747          | 79                                 | 44                      | 40                     | 0      | 20    | 1930         | -0.52%                   | -1.46%               |
| steel_q5_chest_limited            | 1752          | 81                                 | 48                      | 44                     | 0      | 21    | 1946         | -0.83%                   | -2.3%                |
| steel_q5_chest                    | 1782          | 80                                 | 46                      | 42                     | 0      | 21    | 1972         | -1.34%                   | -3.66%               |
| car_disabled                      | 1937          | 79                                 | 45                      | 40                     | 0      | 22    | 2123         | -7.66%                   | -11.6%               |
| car_filtered_first_coin_disabled  | 2020          | 79                                 | 45                      | 40                     | 0      | 22    | 2206         | -3.91%                   | -15.97%              |
| car_filtered_first_empty_disabled | 2835          | 80                                 | 46                      | 41                     | 0      | 27    | 3028         | -37.26%                  | -59.18%              |
| car                               | 2939          | 81                                 | 48                      | 43                     | 0      | 24    | 3135         | -3.53%                   | -64.8%               |
| car_filtered_last_coin_disabled   | 3881          | 80                                 | 48                      | 42                     | 0      | 29    | 4080         | -30.14%                  | -114.48%             |
| car_filtered_last_empty_disabled  | 4103          | 80                                 | 49                      | 42                     | 0      | 29    | 4304         | -5.49%                   | -126.25%             |

### 5 Tile Results Analysis
- the difference between chest container sizes is such a small impact that it registers as noise
  - even with 40000 total inserters actively transferring in and out of a chest, the difference is so small that it doesn't make any impact to register
- disabled cars are a close second to any chest
- setting the filter on the slots is better than leaving it unset
- disabling cars is important for them to be competitive
- order matters in filtered slots
  - slots that are filtered to be the first slot perform better than items at the last slot
  - example use case: for green circuit production, the first slot should be copper wires and the second slot should be iron
- setting limits on chest has no apparent impact

## 7 Tiles

<a href="images/7_tiles.png"><img src="images/7_tiles.png" alt="7_tiles" height="200"/></a>

This test focuses on if using a larger chest is better than having an extra inserter to transfer items over a 7 tile distance.

### 7 Tile Results All
![alt text](7_tiles/charts/summary_run_distribution_all.png)
![alt text](7_tiles/charts/summary_verbose_metrics_all_table.png)

| Save File                          | Entity Update | Electric/Heat/Fluid Circuit Update | Control Behavior Update | Transport Lines Update | Trains | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| ---------------------------------- | ------------- | ---------------------------------- | ----------------------- | ---------------------- | ------ | ----- | ------------ | ------------------------ | -------------------- |
| car_disabled                       | 1914          | 77                                 | 41                      | 37                     | 0      | 20    | 2090         |                          |                      |
| car_filtered_first_coin_disabled   | 1946          | 75                                 | 38                      | 34                     | 0      | 19    | 2113         | -1.1%                    | -1.1%                |
| car_filtered_first_empty_disabled  | 2750          | 80                                 | 46                      | 41                     | 0      | 26    | 2943         | -39.28%                  | -40.82%              |
| car                                | 2769          | 78                                 | 44                      | 39                     | 0      | 22    | 2951         | -0.27%                   | -41.2%               |
| 3_inserter_limited                 | 2977          | 115                                | 44                      | 39                     | 0      | 23    | 3198         | -8.37%                   | -53.02%              |
| 3_inserter                         | 3143          | 115                                | 45                      | 39                     | 0      | 23    | 3365         | -5.22%                   | -61.01%              |
| tank_disabled                      | 2584          | 837                                | 50                      | 45                     | 0      | 26    | 3542         | -5.26%                   | -69.48%              |
| tank_filtered_first_coin_disabled  | 2655          | 831                                | 50                      | 45                     | 0      | 26    | 3609         | -1.89%                   | -72.69%              |
| car_filtered_last_empty_disabled   | 4035          | 81                                 | 50                      | 42                     | 0      | 29    | 4237         | -17.4%                   | -102.74%             |
| tank_filtered_first_empty_disabled | 3534          | 832                                | 50                      | 44                     | 0      | 29    | 4488         | -5.92%                   | -114.75%             |
| tank                               | 3939          | 863                                | 56                      | 47                     | 0      | 29    | 4934         | -9.94%                   | -136.09%             |
| tank_filtered_last_empty_disabled  | 4833          | 844                                | 52                      | 44                     | 0      | 31    | 5806         | -17.67%                  | -177.81%             |

### 7 Tile Results Analysis
- disabled cars are superior over an extra inserter
- Same as 5 tiles: setting a filter to the item type you are transferring is better than no filter if the rest of the slots are filtered to be not used
- in this test, limiting the slots was better than unlimited slots
- tanks consume electric network update time, even if disabled via the script mentioned in the beginning of this document
- order matters for filters, like other chests

## 9 Tiles

<a href="images/9_tiles.png"><img src="images/9_tiles.png" alt="9_tiles" height="200"/></a>

This test focuses on a 9 tile gap of transfer, which is ideal for a cargo wagon. Cargo wagons can technically transfer either a 9 tiles or 10 tile gap, but has been limited to 9 tiles since inserter chains cannot cover even distances.

### 9 Tile Results All
![alt text](9_tiles/charts/summary_run_distribution_all.png)
![alt text](9_tiles/charts/summary_verbose_metrics_all_table.png)

| Save File                  | Entity Update | Trains | Electric/Heat/Fluid Circuit Update | Control Behavior Update | Transport Lines Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| -------------------------- | ------------- | ------ | ---------------------------------- | ----------------------- | ---------------------- | ----- | ------------ | ------------------------ | -------------------- |
| wagon_limited_empty        | 2032          | 539    | 80                                 | 48                      | 43                     | 24    | 2766         |                          |                      |
| wagon_default              | 2056          | 536    | 79                                 | 46                      | 42                     | 23    | 2781         | -0.54%                   | -0.53%               |
| wagon_filtered_first_coin  | 2118          | 533    | 79                                 | 47                      | 42                     | 23    | 2841         | -2.16%                   | -2.7%                |
| wagon_limited_first_coin   | 2125          | 535    | 79                                 | 47                      | 42                     | 23    | 2851         | -0.35%                   | -3.06%               |
| wagon_filtered_first_empty | 2543          | 551    | 79                                 | 47                      | 42                     | 26    | 3289         | -15.36%                  | -18.89%              |
| wagon_filtered_last_coin   | 2977          | 589    | 80                                 | 48                      | 42                     | 27    | 3764         | -14.44%                  | -36.07%              |
| wagon_filtered_last_empty  | 3060          | 574    | 80                                 | 49                      | 42                     | 28    | 3833         | -1.83%                   | -38.56%              |
| 3_inserter_limited         | 5114          | 157    | 55                                 | 45                      | 0                      | 29    | 5401         | -40.91%                  | -95.24%              |
| 3_inserter_default         | 5167          | 158    | 55                                 | 45                      | 0                      | 29    | 5454         | -0.98%                   | -97.16%              |


- using a wagon is better than daisy chain of inserters
- setting a limit is better than filters, even if the first slot is filtered to the target item
- setting a limit of 1 slot is about the same as no limit on cargo wagons
- wagons take up transport line update time
- order matters for filters, like other chests

## 5 Tiles Backpressure
<a href="images/backpressure.png"><img src="images/backpressure.png" alt="backpressure" height="300"/></a>

In this scenario, 3200 electronic circuits are transferred over the course of 1601 ticks. The center container contains items already inside it. All cars are disabled in this test.

### 5 Tile Backpressure Results
![alt text](5_tiles_backpressure/charts/summary_run_distribution_all.png)
![alt text](5_tiles_backpressure/charts/summary_verbose_metrics_all_table.png)

| Save File                             | Entity Update | Electric/Heat/Fluid Circuit Update | Control Behavior Update | Transport Lines Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| ------------------------------------- | ------------- | ---------------------------------- | ----------------------- | ---------------------- | ----- | ------------ | ------------------------ | -------------------- |
| steel_limited                         | 1744          | 70                                 | 36                      | 33                     | 17    | 1900         |                          |                      |
| wood                                  | 1748          | 70                                 | 36                      | 33                     | 17    | 1905         | -0.26%                   | -0.25%               |
| iron_full                             | 1751          | 70                                 | 36                      | 33                     | 17    | 1908         | -0.16%                   | -0.41%               |
| wood_full                             | 1751          | 70                                 | 36                      | 34                     | 18    | 1908         | 0%                       | -0.41%               |
| steel_full                            | 1750          | 70                                 | 37                      | 34                     | 17    | 1909         | -0.05%                   | -0.46%               |
| steel_q5_full                         | 1759          | 70                                 | 37                      | 33                     | 17    | 1916         | -0.37%                   | -0.83%               |
| iron                                  | 1764          | 70                                 | 36                      | 33                     | 17    | 1921         | -0.26%                   | -1.09%               |
| iron_limited                          | 1766          | 70                                 | 38                      | 34                     | 18    | 1925         | -0.21%                   | -1.3%                |
| wood_limited                          | 1770          | 70                                 | 36                      | 33                     | 17    | 1927         | -0.1%                    | -1.41%               |
| steel_q5_limited                      | 1771          | 70                                 | 37                      | 33                     | 17    | 1928         | -0.05%                   | -1.46%               |
| steel_q5                              | 1789          | 70                                 | 36                      | 33                     | 18    | 1947         | -0.99%                   | -2.46%               |
| steel                                 | 1797          | 72                                 | 40                      | 36                     | 19    | 1964         | -0.87%                   | -3.36%               |
| car_full                              | 2006          | 70                                 | 36                      | 33                     | 19    | 2165         | -10.23%                  | -13.93%              |
| car_default                           | 2044          | 70                                 | 37                      | 33                     | 20    | 2203         | -1.76%                   | -15.93%              |
| car_filtered_first_electronic_circuit | 2070          | 70                                 | 37                      | 34                     | 20    | 2230         | -1.23%                   | -17.35%              |
| car_filtered_first_empty              | 2951          | 71                                 | 38                      | 34                     | 25    | 3119         | -39.87%                  | -64.14%              |
| car_filtered_last_electronic_circuit  | 3599          | 72                                 | 39                      | 34                     | 27    | 3771         | -20.9%                   | -98.45%              |
| car_filtered_last_empty               | 3724          | 71                                 | 39                      | 34                     | 26    | 3894         | -3.26%                   | -104.92%             |

### 5 Tiles Backpressure Results Analysis

- no detectable difference between wood, iron, steel chests
  - amount full or limiting made no detectable difference (less than 0.5% relative difference between save files)
- filters in cars
  - same behavior as above tests
  - setting the filter of the electronic circuit was better than leaving it unfiltered
  - order matters