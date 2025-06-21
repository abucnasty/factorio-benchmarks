## Table of Contents
- [Table of Contents](#table-of-contents)
- [Utilities Used](#utilities-used)
- [Pollution Control Methods](#pollution-control-methods)
  - [Tree Farms](#tree-farms)
  - [Biter Zoos](#biter-zoos)
  - [Biter Dome (Capture Bot Rocket)](#biter-dome-capture-bot-rocket)
- [Test Maps](#test-maps)
  - [tree\_pollution\_farm\_1](#tree_pollution_farm_1)
  - [tree\_biter\_dome\_hybrid](#tree_biter_dome_hybrid)
  - [bot\_dome\_6\_spawners](#bot_dome_6_spawners)
  - [bot\_grid](#bot_grid)
  - [bot\_dome\_gradient\_12\_6\_4\_4\_2](#bot_dome_gradient_12_6_4_4_2)
  - [bot\_dome\_gradient\_15\_12\_6\_4\_2](#bot_dome_gradient_15_12_6_4_2)
  - [bot\_dome\_15\_spawners](#bot_dome_15_spawners)
  - [biter\_pollution\_zoos\_2](#biter_pollution_zoos_2)
  - [biter\_pollution\_zoo\_1](#biter_pollution_zoo_1)
- [Results](#results)
  - [Reference Save Files](#reference-save-files)
  - [Execution Time](#execution-time)
  - [Pollution Cloud Spread](#pollution-cloud-spread)
  - [Weighted Scoring / Performance Comparison](#weighted-scoring--performance-comparison)

## Utilities Used
https://github.com/florishafkenscheid/belt


## Pollution Control Methods

### Tree Farms
![tree-farms-example.png](./images/tree-farms-example.png)

Each tree gradually absorbs a small amount of pollution from its chunk every second. If the pollution level in a chunk exceeds 60 units, then once per second, some trees in that chunk have a chance to either lose one stage of leaves (representing 33% or 50% damage) or have their leaves turn one stage grayer (representing 6.7% damage). In either case—whether the tree loses leaves or becomes grayer—it absorbs 10 units of pollution.

![tree-grid.png](./images/tree-grid.png)

An aggriculture tower can be used to plant seeds and harvest trees. An aggriculutre tower can plant up to 47 trees within its planting perimiter (7x7 grid of 3x3 tiles, minus two for the inserters and agg tower). When planted, a tree takes 10 minutes to fully grow. Thus at maximum the harvester only needs to plant a tree once every 12.766 seconds or every 765.96 ticks. This can be done by creating a simple clock for the aggriculture tower as shown below:

![agriculture-tower-clocking.png](./images/agriculture-tower-clocking.png)

The clock is shared by all agriculture towers in the setup shown above but does not necessarily have to. This works by enabling the agriculture tower only when it has less than 4 wood (amount per harvest) and clocking the inserter to only pull 4 items at a time. The stack size is irrelevant for this as each tick it will grab 4 items and on the 4th iteration it will drop the output. 

In practice, an aggriculture tower with the ability to plant all 47 trees will be able to consume up to 450 pollution per minute from testing if clocked in the method described above.

Multiple rows of towers are used and the clock timing should increase for each row as the pollution absorption requirements are lessened the further away from the center of the pollution cloud. This can be done purely by observation. If the leaves on the trees are predominantly green in a row, the clock timer can be increased to slow down harvest rates, thus saving ups. 

The pro of this design is that it can be fine tuned for pollution demands and it is self sufficient as the wood can be harvested and turned back into seeds. You will need to recycle wood occassionally because the seeds returned from harvests are always a net positive over tree seeds planted.

The cons with this approach is that there will be pollution leakage that must be absorbed by tiles as trees only begin to take damage when the pollution value is over 60 in a chunk, but any pollution over 15 in a chunk will leak at a 2% rate into all neighboring chunks every 64 ticks. Thus leakage is guaranteed.

### Biter Zoos
![biter-zoos.png](./images/biter-zoos.png)

Biter zoos are the concept of intentionally placing captive biter spawners out into the wild and not feeding them bioflux so that they turn back into normal spawners. At 100% pollution, a captive biter spawner will be able to absorb up to 600 pollution per minute.

The problem with this method is that you have to be careful to allow a biter to "join an attack group". As long as the biter joins the attack group, pollution is absorbed by the nest.

By enabling the "show unit group info" option in debug settings, the attack group status can be observed as a color coded circle for each attack group and biters with the same color indicate they have joined that attack group as shown in the image below:
![unit-attack-group.png](./images/unit-attack-group.png)

If the lasers are placed too close to the nests, then the biter will pick the laser as the attack target and not join an attack group and instead act as a "defense biter". In practice through many hours of testing, it has been observed that if no other nests are near the spawner within 6 other tiles of distance (3 chunks between) spawners not including their own chunks, then there is an average distance an attack group will form which can be seen below:
![most-likely-attack-group-zone.png](./images/most-likely-attack-group-zone.png)

The distance is 16 tile or half a chunk from the center of the biter nest in all directions. So ideally, the lasers should be placed far enough away as to not be considered a threat, but close enough to be able to kill biters that are joining an attack group. This can be done by placing the lasers with one tile overlap to their average attack group location shown below:
![biter-zoo-laser-distance.png](./images/biter-zoo-laser-distance.png)

This will on average have the biters consistently join an attack group, however occasionally the attack group can form in the middle of the nests if the spawners do not occupy all tiles within the center of the biter spawner cluster. So to avoid this problem, placing the spawners as close together as possible is ideal, but this now limits how many spawners can be within a grouping.

### Biter Dome (Capture Bot Rocket)
When a captive biter spawner is not fed bioflux, it will lose 1 health per second. A normal quality captive biter spawner has 350 health, so it takes a total time of 350 seconds for it to lose all its health. When health becomes zero, it turns back into a normal biter spawner. The instant it does, it consumes 1200 pollution. The rate at which it consumes the pollution varies based on the amount of pollution in that chunk, but it will typically consume it in about 14 seconds or so as shown below:
![captive-biter-spawner-max-absorb.png](./images/captive-biter-spawner-max-absorb.png)

The moment is hatches, it can be captured again by a capture bot rocket with no penalty to pollution absorption. The capture bot rocket has a progress bar with 21 squares in it:
![capture-bot.png](./images/capture-bot.png)
Each square progresses at a rate of 1 per second, so it takes 21 seconds to capture a biter spawner again.

By placing either pipes or walls around the biter spawner, biters can be prevented from hatching.

This means that on a 371 second cycle, a captive biter spawner can absorb 1200 pollution. This means that a biter spawner can absorb 3.23 pollution per second or 194 pollution per minute. This is almost exactly the pollution output of a fully beaconed biolab which produces 203.84 pollution per minute. This is convenient in planning out the number of captive biter spawners you will need.

The inserter feeding a capture bot rocket inot a turret can be clocked based on the total number of spawners in its firing range to evenly spread out the decay across biter spawners. This is critical in constantly removing pollution from a given chunk. The more spawners, the better.

## Test Maps

### tree_pollution_farm_1
![tree_pollution_farm_1](./images/tree_pollution_farm_1.png)
### tree_biter_dome_hybrid
![tree_biter_dome_hybrid](./images/tree_biter_dome_hybrid.png)
### bot_dome_6_spawners
![bot_dome_6_spawners](./images/bot_dome_6_spawners.png)
### bot_grid
![bot_grid](./images/bot_grid.png)
### bot_dome_gradient_12_6_4_4_2
![bot_dome_gradient_12_6_4_4_2](./images/bot_dome_gradient_12_6_4_4_2.png)
### bot_dome_gradient_15_12_6_4_2
![bot_dome_gradient_15_12_6_4_2](./images/bot_dome_gradient_15_12_6_4_2.png)
### bot_dome_15_spawners
![bot_dome_15_spawners](./images/bot_dome_15_spawners.png)
### biter_pollution_zoos_2
![biter_pollution_zoos_2](./images/biter_pollution_zoos_2.png)
### biter_pollution_zoo_1
![biter_pollution_zoo_1](./images/biter_pollution_zoo_1.png)

## Results

### Reference Save Files

Two files are used as references. One with pollution enabled and just allowing pollution to spread naturally and absorbed via tiles. The second is with pollution disabled.

| map_name              | effective_ups | avg_ms | ms increase | min_ms | max_ms |
| --------------------- | ------------- | ------ | ----------- | ------ | ------ |
| lab_base_no_pollution | 2281.063206   | 0.4384 | 0           | 0.281  | 1.711  |
| lab_base              | 2195.597404   | 0.4554 | 0.017       | 0.291  | 1.79   |

### Execution Time
| map_name                      | effective_ups   | avg_ms     | ms increase | min_ms    | max_ms    | percent_diff_from_base |
| ----------------------------- | --------------- | ---------- | ----------- | --------- | --------- | ---------------------- |
| tree_pollution_farm_1         | **1340.660613** | **0.7462** | **0.3078**  | **0.426** | 8.244     | **-41.23%**            |
| tree_biter_dome_hybrid        | 1255.03709      | 0.7968     | 0.3584      | 0.463     | 9.168     | -44.98%                |
| bot_dome_6_spawners           | 1040.033542     | 0.9616     | 0.5232      | 0.501     | 16.356    | -53.44%                |
| bot_grid                      | 1062.151176     | 0.9426     | 0.5042      | 0.576     | **3.485** | -54.41%                |
| bot_dome_gradient_12_6_4_4_2  | 901.1483761     | 1.1098     | 0.6714      | 0.602     | 5.26      | -60.49%                |
| bot_dome_gradient_15_12_6_4_2 | 754.2724623     | 1.326      | 0.8876      | 0.726     | 9.178     | -66.93%                |
| bot_dome_15_spawners          | 592.1554984     | 1.6888     | 1.2504      | 0.899     | 17.555    | -74.04%                |
| biter_pollution_zoos_2        | 531.9715797     | 1.88       | 1.4416      | 1.399     | 3.724     | -76.68%                |
| biter_pollution_zoo_1         | 432.0167769     | 2.317      | 1.8786      | 1.759     | 4.18      | -81.06%                |

> Bold highlighted items indicate best in that category
> 
![execution-time-increase-ms-chart.png](./images/execution-time-increase-ms-chart.png)

![raw-average-ups-chart.png](./images/raw-average-ups-chart.png)

### Pollution Cloud Spread

| map_name                      | Polluted Tiles | Polluted Chunks | Pollution Area Reduction |
| ----------------------------- | -------------- | --------------- | ------------------------ |
| bot_dome_15_spawners          | 670,298.06     | 654             | 99.32%                   |
| biter_pollution_zoo_1         | 748,852.02     | 731             | 99.24%                   |
| bot_dome_gradient_15_12_6_4_2 | 946,558.72     | 924             | 99.04%                   |
| bot_dome_gradient_12_6_4_4_2  | 1,906,382.82   | 1861            | 98.06%                   |
| bot_dome_6_spawners           | 2,946,289.26   | 2877            | 97.01%                   |
| tree_biter_dome_hybrid        | 3,055,420.34   | 2983            | 96.90%                   |
| tree_pollution_farm_1         | 5,314,244.31   | 5189            | 94.61%                   |
| biter_pollution_zoos_2        | 7,708,412.80   | 7527            | 92.18%                   |
| bot_grid                      | 14,205,675.65  | 13872           | 85.58%                   |

![pollution-area-reduction-chart.png](./images/pollution-area-reduction-chart.png)

### Weighted Scoring / Performance Comparison

The score is computed by taking the pollution area reduction % over my current base that had a total of 98 million tiles of polluted tiles with the same lab configuration divided by the execution time increase percent.

```
original_polluted_tiles_count = 5600*5600*3.14159265
base_execution_time = 0.4384 // ms

execution_time_increase_percent = ABS(average_execution_time - base_execution_time) / average_execution_time
pollution_area_reduction = (original_polluted_tiles_count - polluted_tiles) / original_polluted_tiles_count

score = pollution_area_reduction / execution_time_increase_percent * 10
```

| map_name                      | avg_ms | ms increase over base | Polluted Tiles | Execution Time Increase Percent | Pollution Area Reduction | Score |
| ----------------------------- | ------ | --------------------- | -------------- | ------------------------------- | ------------------------ | ----- |
| tree_pollution_farm_1         | 0.7462 | 0.3078                | 5,314,244.31   | 41.25%                          | 94.61%                   | 22.94 |
| tree_biter_dome_hybrid        | 0.7968 | 0.3584                | 3,055,420.34   | 44.98%                          | 96.90%                   | 21.54 |
| bot_dome_6_spawners           | 0.9616 | 0.5232                | 2,946,289.26   | 54.41%                          | 97.01%                   | 17.83 |
| bot_dome_gradient_12_6_4_4_2  | 1.1098 | 0.6714                | 1,906,382.82   | 60.50%                          | 98.06%                   | 16.21 |
| bot_grid                      | 0.9426 | 0.5042                | 14,205,675.65  | 53.49%                          | 85.58%                   | 16.00 |
| bot_dome_gradient_15_12_6_4_2 | 1.326  | 0.8876                | 946,558.72     | 66.94%                          | 99.04%                   | 14.80 |
| bot_dome_15_spawners          | 1.6888 | 1.2504                | 670,298.06     | 74.04%                          | 99.32%                   | 13.41 |
| biter_pollution_zoo_1         | 2.317  | 1.8786                | 748,852.02     | 81.08%                          | 99.24%                   | 12.24 |
| biter_pollution_zoos_2        | 1.88   | 1.4416                | 7,708,412.80   | 76.68%                          | 92.18%                   | 12.02 |

![weighted-score-chart.png](./images/weighted-score-chart.png)