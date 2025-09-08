# 2025 Q1 Nauvis Science Competition: Chemical Science

## Table of Contents
- [2025 Q1 Nauvis Science Competition: Chemical Science](#2025-q1-nauvis-science-competition-chemical-science)
  - [Table of Contents](#table-of-contents)
  - [Chemical Science Entries](#chemical-science-entries)
    - [Validation](#validation)
    - [Designs that Passed Tests ✅](#designs-that-passed-tests-)
    - [Designs that Failed Tests ❌](#designs-that-failed-tests-)
    - [Design Alterations](#design-alterations)
      - [05\_derantrix](#05_derantrix)
  - [Save Files](#save-files)

## Chemical Science Entries
### Validation
All designs must be able to pass my acceptance criteria which is as follows:

All tests must reach a stable state and have fully saturated belts for 5 min after becoming stable:
1. cold start until science belt is fully saturated,
2. Run until belts are backed up then release into infinity loaders,
3. Remove one input and add it back
4. Cut off all inputs and add it back

I do this for all my builds. These issues happen commonly in real bases so it’s worth testing these things.
It also ensures that when I run a 36k+ tick benchmark, they will continue to produce science throughout the
test without any hiccups.  

Additionally, since there are many RS latches in these designs, longer benchmarks will need to be run for 
the final bracket. Therefore, each design must produce at 240/s continuously for 1 hour (216k ticks).
  

### Designs that Passed Tests ✅

| Author                | Design Index             | Science Per Second | Design Tags                                                                                                      | Blueprint                                                                         | Save File                                                                       |
| --------------------- | ------------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| abucnasty             | 00_baseline              | 240/s              |                                                                                                                  | [design_00_baseline](blueprints/design_00_baseline.txt)                           | [design_00_baseline.zip](maps/design_00_baseline.zip)                           |
| undertow              | 01_undertow              | 480/s              | Direct Insertion, Molten Fluid Bus, Basic Oil                                                                    | [design_01_undertow](blueprints/design_01_undertow.txt)                           | [design_01_undertow.zip](maps/design_01_undertow.zip)                           |
| SwiftDeath007         | 03_swiftdeath007         | 240/s              | Direct Insertion, Molten Fluid Bus, Basic Oil, 6 Beacon Science                                                  | [design_03_swiftdeath007](blueprints/design_03_swiftdeath007.txt)                 | [design_03_swiftdeath007.zip](maps/design_03_swiftdeath007.zip)                 |
| SwiftDeath007         | 04_swiftdeath007         | 240/s              | Direct Insertion, Molten Fluid Bus, Basic Oil, 12 Beacon Science                                                 | [design_04_swiftdeath007](blueprints/design_04_swiftdeath007.txt)                 | [design_04_swiftdeath007.zip](maps/design_04_swiftdeath007.zip)                 |
| DerAntrix             | 05_derantrix             | 480/s              | Direct Insertion, Molten Fluid Bus, Basic Oil, 9 Beacon Science                                                  | [design_05_derantrix](blueprints/design_05_derantrix.txt)                         | [design_05_derantrix.zip](maps/design_05_derantrix.zip)                         |
| imp                   | 06_imp                   | 240/s              | Direct Insertion, Basic Oil, 10 Beacon Science                                                                   | [design_06_imp](blueprints/design_06_imp.txt)                                     | [design_06_imp.zip](maps/design_06_imp.zip)                                     |
| lady_meyneth          | 08_lady_meyneth          | 240/s              | Direct Insertion, Molten Fluid Bus, Basic Oil, Coal Direct Insertion Mining, CARGO WAGONS FTW, 11 Beacon Science | [design_08_lady_meyneth](blueprints/design_08_lady_meyneth.txt)                   | [design_08_lady_meyneth.zip](maps/design_08_lady_meyneth.zip)                   |
| Jobo                  | 09_jobo                  | 240/s              | Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil, Requires backpressure at all times,             | [design_09_jobo](blueprints/design_09_jobo.txt)                                   | [design_09_jobo.zip](maps/design_09_jobo.zip)                                   |
| TheFlyingCurryFish154 | 11_theflyingcurryfish154 | 960/s              | Molten Fluid Bus, Basic Oil, Mix of Direct Insertion and Belts                                                   | [design_11_theflyingcurryfish154](blueprints/design_11_theflyingcurryfish154.txt) | [design_11_theflyingcurryfish154.zip](maps/design_11_theflyingcurryfish154.zip) |
| phlap                 | 12_phlap                 | 240/s              | Direct Insertion, Molten Fluid Bus, Basic Oil                                                                    | [design_12_phlap](blueprints/design_12_phlap.txt)                                 | [design_12_phlap.zip](maps/design_12_phlap.zip)                                 |
| phlap                 | 13_phlap                 | 240/s              | Recipe Switching, Basic Oil                                                                                      | [design_13_phlap](blueprints/design_13_phlap.txt)                                 | [design_13_phlap.zip](maps/design_13_phlap.zip)                                 |
| abucnasty             | 14_abucnasty             | 240/s              | Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil                                                  | [design_14_abucnasty](blueprints/design_14_abucnasty.txt)                         | [design_14_abucnasty.zip](maps/design_14_abucnasty.zip)                         |
| Yuu                   | 16_yuu                   | 240/s              | Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil, Silo                                            | [design_16_yuu](blueprints/design_16_yuu.txt)                                     | [design_16_yuu.zip](maps/design_16_yuu.zip)                                     |
| lady_meyneth          | 18_lady_meyneth          | 240/s              | Direct Insertion, Molten Fluid Bus, Basic Oil, CARGO WAGONS!!!, 11 Beacon Science                                | [design_18_lady_meyneth](blueprints/design_18_lady_meyneth.txt)                   | [design_18_lady_meyneth.zip](maps/design_18_lady_meyneth.zip)                   |
| Werezwolf             | 19_werezwolf             | 240/s              |                                                                                                                  | [design_19_werezwolf](blueprints/design_19_werezwolf.txt)                         | [design_19_werezwolf.zip](maps/design_19_werezwolf.zip)                         |
| Toda1                 | 20_toda1                 | 240/s              | Direct Insertion, Molten Fluid Bus, Advanced Oil                                                                 | [design_20_toda1](blueprints/design_20_toda1.txt)                                 | [design_20_toda1.zip](maps/design_20_toda1.zip)                                 |

> Note: MCMayhem57 has three designs and need to be broken up into tests (design 22, 23, and 24)

**Special Considerations**
- 15_yuu no idea how to start it from blueprint... waiting response
- 16_yuu uses rocket silo chesting, so two versions were created. One with a realistic scenario with 5 ships over Nauvis and one without any ships.
  - thus, for the first round it is only competing against the baseline, so 16_yuu
- 17_henryjk (waiting on fixed version)


### Designs that Failed Tests ❌

| Author        | Design Index     | Science Per Second | Blueprint                                                         | Failure Reason                                                                                             |
| ------------- | ---------------- | ------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| SwiftDeath007 | 02_swiftdeath007 | 240/s              | [design_02_swiftdeath007](blueprints/design_02_swiftdeath007.txt) | Failed losing molten iron (test 3)                                                                         |
| Osboz         | 07_osboz         | 480/s              | [design_07_osboz](blueprints/design_07_osboz.txt)                 | Failed upon losing coal, deadlock on lead assembler stuck at 8 science (test 3)                            |
| Ztirom22      | 10_ztirom22      | 240/s              | [design_10_ztirom22](blueprints/design_10_ztirom22.txt)           | Failed to produce 240/s consistently, waited for 216k ticks for it to stabilize but it never did. (test 1) |
| Syvkal        | 21_syvkal        | 480/s              | [design_21_syvkal](blueprints/design_21_syvkal.txt)               | Failed losing molten iron (test 3)                                                                         |

### Design Alterations
Below are changes made by abucnasty while creating the save files from the original blueprints.


#### 05_derantrix
Moved corner beacons to all be in line with the rest of the beacons. No impact to the design, just allows them to tile perfectly and was a seemingly small change.
![05_derantrix_modification.png](images/05_derantrix_modification.png)




## Save Files
- each save file consist of the same basic 
- each design is copied as a module of 8 lanes 12 times with region cloner
- total amount of science being produced per save file, unless called out as an exception below, creates at least **1_382_400** science per minute when looking at the 10 minute metrics

Below is a preview of the template map:
![map_template_preview.png](images/map_template_preview.png)

when building the save files, these are the steps performed:
  1. copy the design manually with no power on the map
     1. number of copies is 8 for 240/s, 4 for 480/s, etc.
  2. connect all inputs
  3. wait until the single coal belt saturates inputs for each copy
  4. remove infinity pipes
  5. add infinity accumulator and wait until output belts are saturated
  6. pause the game
     1. add infinity loaders to output belts
     2. copy all entities 12 times
     3. remove the original design
     4. unpause the game
     5. set game to 64x speed
     6. save

The exception to the above is if the design has multiple stages. If this is the case as noted
by the creator of the design, the steps will be performed after power is added to the map after 
step 5 but before step 6.

The only accepted runtime mod is editor extensions.

To keep the map files relatively consistent and prevent cloning problems during chunk generation, the following command is execute to reveal the width of the clone region vertically.
```

/c game.player.force.chart(game.player.surface, {{-466,477}, {-145, -4500}})

```