<h1>2025 Q1 Nauvis Science Competition: Utility Science</h1>

<h2>Table of Contents</h2>

- [Preface](#preface)


## Preface

Utility science... chemical explosion.

## Document Index

> Note: The High Level Conclusion and Composite Design documents are the most useful to understand the trade offs between different design choices.

- [Design Submissions](docs/submissions.md)


## Overview

### Competition Structure

1. Submission Phase
   1. Initial designs are submitted for a period of three weeks
    2. The designs are tested to ensure they validate the stability guidelines
2. Benchmark Phase
    1. The designs are benchmarked on one computer by the host abucnasty
    2. The designs that exceed the baseline move on to a round 2 where a longer benchmark is run
3. Component Breakdown
    1. TBD (TODO DOCUMENTATION)
4. Composite Designs
    1. TBD
5. Documentation & Analysis
    1. Document the findings and generate charts

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


## Credits
Special thanks to all the people that participated in this competition and contributed to the findings. (names sorted alphabetically)

- `ANdyMannn`
- `atlan`
- `Azhrei`
- `crag666`
- `Cy27`
- `DerAntrix`
- `Dorrian`
- `Flexime`
- `goirelandbrad`
- `MCMayhem57`
- `MRX8024`
- `Poochuggah`
- `StupidFatHobbit`
- `Swiftdeath007`
- `Thaeln`
- `TheFlyingCurryFish154`
- `tou`
- `Yuu`