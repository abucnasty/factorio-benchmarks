## Test Scenario
- smelting iron ore into steel (240/s per design)
- 256 smelters per test file
- 100x speed
- Benchmark: 5k tics, 5 sample runs per save file

### Designs to be tested

#### iron smelter enable clocked
![smelter_enable_clocked](./images/smelter_enable_clocked.png)

#### iron smelter lead follower
![smelter_lead_follow](./images/smelter_lead_follow.png)
#### iron smelter lead follower mini
![smelter_lead_follower_mini](./images/smelter_lead_follower_mini.png)
#### iron smelter threshold
![smelter_threshold](./images/smelter_threshold.png)

### 📈 **Results**

| control strategy                | map_name                            | mean_ups | mean_avg_ms | mean_min_ms | mean_max_ms |
| ------------------------------- | ----------------------------------- | -------- | ----------- | ----------- | ----------- |
| iron smelter lead follower      | iron_smelter_lead_follower.zip      | **1461** | **0.6854**  | 0.4770      | **2.2260**  |
| iron smelter lead follower mini | iron_smelter_lead_follower_mini.zip | 1456     | 0.6874      | **0.4006**  | 2.6394      |
| iron smelter threshold          | iron_smelter_threshold.zip          | 1433     | 0.6984      | 0.4302      | 2.2758      |
| iron smelter enable clocked     | iron_smelter_enable_clocked.zip     | 1399     | 0.7150      | 0.4316      | 2.2892      |

![results](./images/results.png)

### 🧠 **Analysis & Conculsions**

Comparing the builds that have the exact same base design, the lead follower pattern wins out. The iron larger design makes sense to be more performant as it has more beacons and consistent speeds across all furnaces, making it so the furnaces don't have to run as long.