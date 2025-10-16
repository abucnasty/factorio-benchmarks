## Chicken Scratch

Miner is 25% quality (4*6.25%)
- 75 Q1 (1-Q)
- 22.5 Q2 (Q * 9 / 10)
- 2.25 Q3 (Q * 9 / 100)
- 0.225 Q4 (Q * 9 / 1000)
- 0.025 Q5 (Q * 1 / 1000)

Target:
- 240/s Q2
Ratio 32/3


- 800/s Q1 

8 inserters every 9.6 ticks (48/5 ticks) into recyclers.

8 inserters, 5 swings, every 48 ticks (40 ticks on, 8 ticks off)

Per recycler, 4 inserters, so 400/s per recycler.

400/s * 0.25 = 100 / s of byproduct. 2 inserters active every 19.2 ticks or

500/s per recycler active time, must destroy 50 items every 6 ticks.



Recycling Ore Raw

- Default Recipe is 32 items / second input, 8 items output.
- Legendary recycler, 4 T3Q5 modules and 6 beacons has a speed multiplier of 26.637499332428
- In this configuration, the recycler can void ~852.4 ore per second

So it will need to active for 35.19 ticks out of 60. Another way to think of it is it can void 128 items in exactly 9 ticks.

Inserter and recycler timers:

4 inserters will put 128 items into the recycler in 2 swings (16 ticks). The inserters will land in the recycler on the 12th tick, so a period of 21 ticks would be established. The byproduct produced by this cycle is 32 items. The by product could be handle the next cycle by an inserter swinging twice as long as all the ingredients in the recycler are voided. Since there are 32 items of byproduct, a single inserter could swing twice in the same period as the 4 original input inserters. If the recycler is fully empty, this would stack up to 160 items as the first swing of 5 inserters would be under the automated insertion limit of 100, putting only 80 items in the recycler. So the recycler needs to be active now for 11.25 ticks to void all the items, so rounding up would be 12 ticks.

If we increase this though to 6 inserters, we can now load occasionally 192 items into the recycler to deal with excess in the recycler, but the recycler will take now 192/128*9 = 13.5 ticks to void the items. This would yield a full period rounding up to recycling for 14 ticks to 12+16 ticks (12 loading, 16 recycling) which just barely gets over the 


So if we create a period of 24 ticks




So with 12 ticks inserting phase and 12 ticks recycling phase, we can connect all entities into the network and send a value on / off every 24 ticks at half period.





So the phase will be:

load: 16 ticks, 





- 24/s Q3 (1 inserter every 16 / 40 ticks)
- 2.4/s Q4 (1 inserter every 3200 ticks)
- 4/15 Q5 / s (1 inserter every 28800 ticks)

