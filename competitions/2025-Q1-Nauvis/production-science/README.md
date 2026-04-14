<h1>2025 Q1 Nauvis Science Competition: Production Science</h1>

<h2>Table of Contents</h2>

- [Preface](#preface)
- [Best Design](#best-design)
- [Document Index](#document-index)
- [Overview](#overview)
  - [Competition Structure](#competition-structure)
  - [Design Competition Categories](#design-competition-categories)
  - [Validation](#validation)
  - [Challenges](#challenges)
- [Credits](#credits)

## Preface
Purple science. The science that brings even experienced megabasers to their knees... you may well know the feeling when you automate red and green science to 60 SPM in the early game and feel really proud of yourself. Then you figure out how to crack petroleum and balance those fluids to crank out chemical science. You then finally unlock purple science and think "how hard can this truly be, it only takes three ingredients like the last one I learned?".

Oh sweet child. How wonderful to be innocent once again.

Quick Facts:

- 23 people created designs
- 36 full science production designs were tested
- 28 furnace production designs were tested
- 17 productivity module designs were tested


## Best Design

If you are only here to see what the best designs look like, here are the [winners](docs/winners.md)

Refer to the public blueprint page for the latest book of purple science blueprints which includes specific modules that abucnasty has tested in his own save file: [public blueprint page](../../../docs/blueprints/README.md)

## Document Index

> Note: The High Level Conclusion and Composite Design documents are the most useful to understand the trade offs between different design choices.

- [High Level Conclusions](docs/high-level-conclusions.md)
- [Design Submissions](docs/submissions.md)
- [Round 01 Qualifiers](docs/round-01.md)
- [Round 02 Stress Test](docs/round-02.md)
- [Furnace Production Designs](docs/furnace-designs.md)
- [Productivity Module Designs](docs/productivity-modules.md)
- [Composite Designs](docs/composite-designs.md)
- [Submission Guidelines](docs/submission-guidelines.md)

## Overview

### Competition Structure

1. Submission Phase
   1. Initial designs are submitted for a period of three weeks
    2. The designs are tested to ensure they validate the stability guidelines
2. Benchmark Phase
    1. The designs are benchmarked on one computer by the host abucnasty
    2. The designs that exceed the baseline move on to a round 2 where a longer benchmark is run
3. Component Breakdown
    1. Productivity Modules are tested in isolation from best performing builds
    2. Electric Furnace Modules are tested in isolation from best performing builds
    3. New builds are accepted by the community during this phase for both above modules
4. Composite Designs
    1. Composite designs are created by taking the best parts of the component breakdowns
    2. Arbitrary things that abucnasty finds interesting to benchmark are sprinkled in
    3. The composite designs are tested to determine if a better design can be created
5. Documentation & Analysis
    1. Document the findings and generate charts

### Design Competition Categories

Given that any stone patch setting is allowed, the designers were told to indicate based on the submission guidelines which patch sizes they designed their build around.

The following are the patch sizes taken from the submission guidelines.

| Patch Size World Setting | Average Patch Size [tiles^2] | Equivalent Circular Brush Size |
| ------------------------ | ---------------------------- | ------------------------------ |
| 100%                     | 970                          | 18                             |
| 200%                     | 1809                         | 24                             |
| 400%                     | 3204                         | 32                             |
| 600%                     | 4352                         | 37                             |

The reason that larger world patch sizes are chosen are for direct insertion mining drills for stone production.

The following categories will be used for comparisons:

1. belted stone (any)
2. 100% Patch Size (100)
3. 200% Patch Size (200)
4. 600% Patch Size (600)

### Validation
All designs must be able to pass abucnasty's acceptance criteria which are described below.

All tests must reach a stable state and have fully saturated belts for 5 min after becoming stable:
1. cold start until science belt is fully saturated
2. Run until belts are backed up then release into infinity loaders
3. Remove one input and add it back
4. Cut off all inputs and add it back
5. each design must produce at 240/s continuously for 1 hour (216k ticks)

These issues happen commonly in real bases so it’s worth testing these things. It also ensures that when a 36k+ tick benchmark, they will continue to produce science throughout the
test without any hiccups.

### Challenges
This science, well known for the rivers of stone and steel required to produce it, is an immense increase in complexity in terms of logistics.

There are many options on how to transport materials for this science:
1. belt stone to the science production area
2. direct insert stone into furnaces to produce stone bricks
3. direct insert stone into rail assemblers
4. direct insert stone into furnaces to produce bricks and then direct insert into an assembler to make even more furnaces
5. what stone patch size settings do you need and how much does that impact the layouts and UPS metrics

Have I mentioned stone?

6. belt green circuits
7. belt plastic
8. advanced oil cracking vs basic oil cracking
9. liquid cast copper wire or copper plates
10. liquid cast steel
11. direct insert steel into everything with many foundries
12. belt steel to everything with less foundries
13. direct insert rail assemblers into purple science assemblers

Okay you get the idea.

The point of this competition is to do a UPS comparison of many of these strategies.

## Credits
Special thanks to all the people that participated in this competition and contributed to the findings. (names sorted alphabetically)

- AkaraVortex
- Azhrei 
- DerAntrix
- Em (EmiliaT) 
- Erichteia
- Flexime
- Galacta487 
- Geist
- goirelandbrad
- Groot opperhoofd 
- MCMayhem57 
- mulain 
- RedPhoenixQ
- rydberg
- Swiftdeath007
- Syvkal 
- teaz 
- Thaeln 
- The End
- TheFlyingCurryFish154
- warbaque 
- yoyonas
- Yuu