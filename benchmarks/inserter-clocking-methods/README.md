## Overview

## Test Scenario

- steal smelter making 240 steel per second
  - fully beaconed
  - 16 legendary furnaces (8 smelting iron, 8 smelting steel)
  - 24 legendary stack inserters per module
- each test file contains 128 copies of the base module with different inserter control strategies
- camera and player model is in the same location for each file
- each run is executed for 10,000 tics at 100x speed
- blueprints used: [blueprints](./blueprints.txt)

Why was this chosen as the candidate?
- requires separate clocks for each inserter
  - clock pulling from turbo belt into iron plate smelter
  - clock pulling from iron smelter into steel smelter
  - clock pulling from steel smelter and dropping on turbo belt
- This a real world example that would be used, requiring varying inserter clocks for a single assembly module

Preview of furnace stack (specifically the wake list only variation):

![furnace_stack_preview](./images/furnace_stack_preview.png)



## Control Strategy Definitions

### Enable Clocked

Enable / disable inserter based on clock

![clock_example_1](./images/clock_example_1.png)

### Filter Clocked

Set filter on inserters based on clock. (same clock setup as in "Enable Clocked")
![](./images/filter_clock_example.png)

### Threshold
Directly connected circuit network to furnace or assembly machine with "read contents" and "include in crafting" enabled.

Sets the inserter enable / disable based on *threshold* values.

![threshold_example](./images/threshold_example.png)

### Lead / Follower
First furnace is monitored by a decider combinator. When it drops below a threshold, it sends an activation signal to enable all downstream inserters to insert at the same time. Similiar to threshold, but it introduces the concept of a "lead" furnace. 

![lead_follow_example](./images/lead_follow_example.png)

> Note: This assumes that within a single assembly module (like the furnace stack used here) all machines (furnaces, assemblers, etc.) have the same demand for inputs and outputs and highly is dependent on having backpressure on the input material (e.g. ore is oversupplied in the example test case).


### Threshold Guarded

Same as `Threshold` but uses decider combinators to intercept the signal. This is to test the theory that an inserter should be "guarded" from upstream changes to the circuit network and only send a single pulse value when it should be enabled or disabled.
![threshold_guarded_example](./images/threshold_guarded_example.png)

## Results

Here's the full analysis for your **new Factorio benchmark results**, following the same structure as before:

### 🔍 **Overview of Metrics**

| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second – higher is better |
| **Mean Avg (ms)** | Average frame time – lower is better  |
| **Mean Min (ms)** | Minimum frame time – lower is better  |
| **Mean Max (ms)** | Maximum frame time – lower is better  |

### 📈 **Results**

| Control Strategy  | Mean UPS | Mean Avg (ms) | Mean Min (ms) | Mean Max (ms) |
| ----------------- | -------- | ------------- | ------------- | ------------- |
| **lead follower** | **1745** | **0.5734**    | 0.3420        | **2.0326**    |
| enable clocked    | 1697     | 0.5900        | **0.3388**    | 2.2434        |
| filter clocked    | 1644     | 0.6086        | 0.3604        | 2.1598        |
| threshold         | 1632     | 0.6136        | 0.4852        | 2.0892        |
| wake list only    | 1520     | 0.6584        | 0.4662        | 2.3418        |

Bold highlighted items indicate best in that category

![benchmark_result_bar_graph_ups](./images/benchmark_result_bar_graph_ups.png)
![benchmark_result_bar_graph_ups_percent_diff](./images/benchmark_result_bar_graph_ups_percent_diff.png)

### 🧠 **Analysis & Conculsions**

#### ✅ **Best Overall Performance** - **Lead follower**

- **Highest UPS** (1745)
- **Lowest average (0.5734 ms)** and **max frame time (2.0326 ms)**
- Great balance of throughput and latency
- Clearly the most performant strategy in this batc

#### ⚠️ **Least Efficient** - **Wake list only**
- **Lowest UPS (1520)** and **highest average frame time (0.6584 ms)**
- Peak latency also the highest
- Consistently underperforms compared to others

#### 🧐 **Threshold vs Others**

- **Threshold** lags in min latency (0.4852 ms – worst in group) despite decent max latency
- Its **UPS is ~6.5% below** lead follower, suggesting overhead or inefficiency under this logic

### 📌 **Recommendations**

- **Use lead follower** for optimal throughput and stability
- **Enable clocked** is a close second 
- Avoid **wake list only**, as it underperforms in every category