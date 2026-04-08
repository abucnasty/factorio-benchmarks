# Production Science Q1 vs Q2

**Platform:** linux-x86_64

**Factorio Version:** 2.0.76

**Date:** 2026-04-07

## The Question

Is Q1 (normal quality) or Q2 (uncommon quality) better in terms of UPS for purple science?

## Scenario
* Each save was tested for 72000 tick(s) and 3 run(s)
* Save files can be downloaded here [google drive](https://drive.google.com/drive/folders/1c3pjG5V4kfJN833jOprMbiTSWkHNWnoA?usp=sharing)

A full megabase is tested producing 3840 SPS of all sciences running mining productivity and worker robot speed.

### Q2 Setup
For Q2, the production rate is 1920 SPS since Q2 has 200% science capacity.

Q2 production is using the most UPS efficient ore voiding strategies known at the time of this benchmark.

Stone is voided by producing landfill from normal quality stone and voiding landfill.
![q2_stone_voiding](images/q2_stone_voiding.png)


Iron, copper, and coal ore is directly voided

![q2_other_ore_voiding](images/q2_other_ore_voiding.png)

The final science "blade" can be seen in the screenshot below. Note the very large steel stack that is required to produce the steel required for 240/s of Q2 purple science.

![q2_blade](images/q2_blade.png)



### Q1 Setup
For Q1, the production of materials is a mix of on patch setups and belted stone.

- Furnaces
  - stone is directly inserted into furnaces from electric mining drills to produce bricks
  - bricks are directly inserted into assemblers to craft furnaces
  - advanced circuits are belted in

![q1_furnace_production](images/q1_furnace_production.png)

- Productivity Modules / Advanced Circuits
  - fully direct inserted
  - fluid bus

![q1_prod_modules_and_red_circuits](images/q1_prod_modules_and_red_circuits.png)

- Science Assemblers
  - belted in furnaces and productivity modules
  - direct inserted rails
  - stone is belted in for rails

![q1_science_assembler](images/q1_science_assembler.png)

## Conclusion

Q1 is better than Q2.

The down side of Q2 is you cannot avoid belting steel and stone given patch size limitations. Given that these are the highest volume ingredients, not being able to directly insert them is a major penality for Q2. The Q2 design used in this benchmark could be improved to leverage more direct insertion of steel, but the down sides of not being able to direct insert stone into furnaces from mining drills will most likely prove to still favor Q1 in the end.

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second - higher is better |
| **Mean Avg (ms)** | Average frame time - lower is better  |
| **Mean Min (ms)** | Minimum frame time - lower is better  |
| **Mean Max (ms)** | Maximum frame time - lower is better  |

| Save                  | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) |
| --------------------- | -------- | -------- | -------- | --- | ------------------- |
| q2_worker_robot_speed | 5.068    | 3.775    | 25.721   | 197 | 1094721             |
| q1_worker_robot_speed | 4.618    | 3.419    | 25.166   | 216 | 997537              |
| q2_mining_prod        | 3.500    | 2.470    | 24.273   | 285 | 755946              |
| q1_mining_prod        | 2.918    | 2.157    | 24.340   | 342 | 630283              |


![alt text](./charts/run_distribution.png)

## Mining Productivity

![alt text](charts/summary_mining_prod.png)

| Save File      | Entity Update | Electric/Heat/Fluid Circuit Update | Control Behavior Update | Transport Lines Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| -------------- | ------------- | ---------------------------------- | ----------------------- | ---------------------- | ----- | ------------ | ------------------------ | -------------------- |
| q1_mining_prod | 1621          | 339                                | 302                     | 120                    | 535   | 2916         |                          | 0%                   |
| q2_mining_prod | 2082          | 351                                | 339                     | 141                    | 585   | 3498         | -19.95%                  | -19.95%              |

## Worker Robot Speed

![alt text](charts/summary_worker_robot_speed.png)

| Save File             | Entity Update | Control Behavior Update | Electric/Heat/Fluid Circuit Update | Transport Lines Update | Other | Whole Update | % Decrease from Previous | % Decrease from Best |
| --------------------- | ------------- | ----------------------- | ---------------------------------- | ---------------------- | ----- | ------------ | ------------------------ | -------------------- |
| q1_worker_robot_speed | 3019          | 377                     | 353                                | 156                    | 712   | 4616         |                          | 0%                   |
| q2_worker_robot_speed | 3325          | 409                     | 360                                | 175                    | 797   | 5066         | -9.75%                   | -9.75%               |

## Timeseries Charts

because graphs are fun!

![alt text](charts/timeseries_q1_mining_prod.png) 

![alt text](charts/timeseries_q1_worker_robot_speed.png)

![alt text](charts/timeseries_q2_mining_prod.png)

![alt text](charts/timeseries_q2_worker_robot_speed.png)