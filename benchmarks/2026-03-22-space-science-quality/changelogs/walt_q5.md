**Walt MK1**

Initial concept (abucnasty)

**Walt MK2**

Modifications by Yuu
- Q4 water production to increase the yield of Q5 ice asteroids (Yuu)
- Excess water is removed using fluid barrels (Yuu)

**Walt MK2.1**

Modifications by abucnasty

- removed dedicated asteroid reprocessing on side asteroid collectors
- moved calcite production to front asteroid collectors
- excess water from Q1 production is removed using fluid voiding

**Walt MK2.1-clux**

Modifications by clux
- legendarised hub.
- slimming down of sides.
- replaces panels with accumulators to use to clock fusion.
- minimizes fluid voiding via concrete.
- clocks fluid producers on the right
- less full belt reads on the right
- clocks iron outserters

**Walt MK2.2**
- adjusted fusion clock to insert when less than 100 to prevent dropping power for too long and dropping production rate

**Walt MK2.3**
- switch hub back to normal quality
- asteroid collector clocking. Enabled for 1 out of every 22 ticks.

**Walt MK2.4**
- prioritize asteroids already in the upcycling loop to prevent transient jamming failures
- disable collectors while over Nauvis when Q5 buffer is reached, doesn't stop belt input
- maintain backpressure buffer on Q1 upcyclers when dormant. No longer necessary since input belt can flow freely.
- fixed top right inserter on right carbonic asteroid reprocessing bank not outputting to anything
**Walt MK2.5**
- introduces distnaced based asteroid collector clocking
  - timing is 1 out of 22 ticks in high density, 1 out of 40 in low density
**Walt MK2.6**
- removed the extra sushi belt for Q5 ice and carbon
- fixes distance based clocking increasing clock frequency from 1 out of 40 ticks to 1 out of 30 while in low asteroid density zone

**Walt MK2.7**
- fixed missing accumulator used to circuit control the fusion fuel inserters

**Walt MK2.8**
- fusion cell inserters check for low fuel for 1 tick when reaching Nauvis to prevent occasional brownouts
- fixed bug in Q5 reprocessing that would void carbonic unecessarily (although unlikely to happen)
- Q5 reprocessing is sorted by the highest available item on the belt