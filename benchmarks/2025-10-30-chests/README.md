# Chest Transfer

**Platform:** windows-x86_64

**Factorio Version:** 2.0.72

## Table of Contents
- [Chest Transfer](#chest-transfer)
  - [Table of Contents](#table-of-contents)
  - [Scenario](#scenario)
  - [Terminology](#terminology)
    - [Cars / Tanks / Silos](#cars--tanks--silos)
    - [Container Configurations](#container-configurations)
    - [Input Configurations](#input-configurations)
  - [Results](#results)
    - [All](#all)
    - [Chests](#chests)
    - [Cars](#cars)
    - [Wagons](#wagons)
    - [Tanks](#tanks)
    - [Max Inserters](#max-inserters)
    - [Timeseries Explanation](#timeseries-explanation)
  - [Conclusion](#conclusion)




## Scenario
- Each save was tested for 30 tick(s) and 50 run(s)
- Each save is paused before the transfer takes place
- 80000 inserters transfer 16 items each over a 14 tick window (40k inputs, 40k outputs)

Example of the transfer process:

![alt text](images/example_save_file.png)

The following types of transfers are tested:

![alt text](images/methods.png)

## Terminology

### Cars / Tanks / Silos
`disabled` represents entities that are disabled via a lua console command. The following commands are used for disabling cars, tanks, and silos:

```lua
-- cars & tanks
/c for _, v in pairs(game.player.surface.find_entities_filtered{type="car"}) do
  v.active = false
end
-- silos
/c for _, v in pairs(game.player.surface.find_entities_filtered{type="rocket-silo"}) do
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

`blank / nothing` if none of the labels above are present, the slots are left in their default configuration. Example:

![alt text](images/nothing.png)


### Input Configurations

`18_input` refers to the following configuration for a silo chest where 18 inserters are putting in 18 items.

![alt text](images/18_inputs.png)

## Results

### All
![alt text](charts/summary_run_distribution_all.png)
![alt text](charts/summary_verbose_metrics_all_table.png)

### Chests
![alt text](charts/summary_run_distribution_chests.png)
![alt text](charts/summary_verbose_metrics_chests_table.png)

### Cars
![alt text](charts/summary_verbose_metrics_car_table.png)

### Wagons
![alt text](charts/summary_verbose_metrics_wagon_table.png)

### Tanks
![alt text](charts/summary_verbose_metrics_tank_table.png)

### Max Inserters
![alt text](charts/summary_verbose_metrics_max_input_table.png)

This chart compares the best performing 1:1 chest transfer which is a wooden chest that is limited to all other chest containers with their maximum amount of inserters per type.

### Timeseries Explanation
![alt text](charts/timeseries_ticks_wood_chest_q1.png)

| Tick  | Description                                                            |
| ----- | ---------------------------------------------------------------------- |
| 0     | Loading the save file and initializing power to all entities (omitted) |
| 1     | pickup from chest (omitted)                                            |
| 2-4   | input inserter swing                                                   |
| 5     | transfer into container                                                |
| 7-8   | input / output inserters swinging                                      |
| 6     | pickup from container                                                  |
| 9     | input inserter return to input chest (inventory scan)                  |
| 10    | output inserter transfer to chest                                      |
| 11-13 | output inserter swinging back                                          |
| 14    | output inserter returns to empty chest and performs an inventory scan  |
| 15-59 | nothing                                                                |

## Conclusion

- batching inventory transfers into a single container is better than separate containers
- limiting slots is better than filtered slots
- multiple transfers from one container
  - cars are the best option and can outperform multiple chests when batched at the same time (clocking)
- tanks are the worst option due to their electric network update time constantly updating (as of 2.0.72) due to most likely their equipment grid, but this can be reduced by maximizing the inserters transferring items in and out of the tank