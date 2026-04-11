<h1> Production Science: High-Level Conclusions</h1>

This document summarizes the key design decisions for UPS-optimized production science. These are actionable guidelines based on benchmarking 36 full science designs, 28 furnace designs, and 17 productivity module designs but your mileage as always may vary.

<h2> Table of Contents</h2>

- [Stone Handling](#stone-handling)
  - [Should you direct insert stone from mining drills or belt it?](#should-you-direct-insert-stone-from-mining-drills-or-belt-it)
  - [Should you clock mining drills?](#should-you-clock-mining-drills)
- [Electric Furnace Production](#electric-furnace-production)
  - [Should you produce furnaces on-patch or belt stone bricks?](#should-you-produce-furnaces-on-patch-or-belt-stone-bricks)
  - [What inserters should be clocked for furnace production?](#what-inserters-should-be-clocked-for-furnace-production)
- [Advanced Circuits for Electric Furnaces](#advanced-circuits-for-electric-furnaces)
  - [Should you direct insert red circuits into electric furnace assemblers?](#should-you-direct-insert-red-circuits-into-electric-furnace-assemblers)
  - [Does the red circuit block layout matter?](#does-the-red-circuit-block-layout-matter)
- [Steel Handling](#steel-handling)
  - [Should you direct insert steel or belt it?](#should-you-direct-insert-steel-or-belt-it)
  - [Should you clock steel inserters from foundries?](#should-you-clock-steel-inserters-from-foundries)
- [Productivity Module Production](#productivity-module-production)
  - [Should you use inserter chains or direct insertion?](#should-you-use-inserter-chains-or-direct-insertion)
  - [Should you use cars as buffers?](#should-you-use-cars-as-buffers)
- [Rail Production](#rail-production)
  - [Should you direct insert stone into rail assemblers?](#should-you-direct-insert-stone-into-rail-assemblers)
- [Inserter Clocking Guidelines](#inserter-clocking-guidelines)
  - [When to clock inserters](#when-to-clock-inserters)
  - [Clocking principle](#clocking-principle)
- [Belt Design Principles](#belt-design-principles)
  - [Pull from straight belts, not undergrounds](#pull-from-straight-belts-not-undergrounds)
- [Summary: The Optimal Design](#summary-the-optimal-design)

## Stone Handling

### Should you direct insert stone from mining drills or belt it?

**Direct insert mining drills dramatically outperform belted stone.**

Testing composite designs showed that using electric mining drills to directly insert stone into rail assemblers (composite_04) achieved **16% better performance** than belting stone to the same assemblers (composite_03).

| Design | Stone Method | UPS |
|--------|--------------|-----|
| composite_04 | Direct insert mining | 1660 |
| composite_03 | Belted stone | 1431 |

![Direct insert mining comparison](screenshots/35_composite_04_purple_block_comparison.png)

The key insight is that direct insertion eliminates the intermediate belt transfer every tick.

### Should you clock mining drills?

**Yes, clocking mining drills is worth it** when directly inserting into furnaces. The clocking reduces intermediate transfer events.

---

## Electric Furnace Production

### Should you produce furnaces on-patch or belt stone bricks?

**On-patch furnace production is dramatically better (30-47% improvement).**

Moving furnace production onto the stone patch eliminates belt transportation overhead entirely.

| Approach | Best UPS | Improvement |
|----------|----------|-------------|
| On-patch 200%+ | 2224 | +47% |
| Belted bricks | 1508 | baseline |

![On-patch furnace production](screenshots/35_composite_04.png)

The best on-patch design (Thaeln's 80/s block) achieved 2224 UPS compared to 1508 UPS for the best belted brick design.

### What inserters should be clocked for furnace production?

| Inserter | Clock? | Reason |
|----------|--------|--------|
| Stone from belt | **No** | Unclocked performs better |
| Stone brick output | **Yes** | Worth clocking |
| Red circuit input | **Yes** | Worth clocking |
| Steel DI from foundry | **No** | Not worth clocking |

---

## Advanced Circuits for Electric Furnaces

### Should you direct insert red circuits into electric furnace assemblers?

**No. Belting red circuits is superior.**

This was a surprising finding. Direct insertion of red circuits for electric furnace production performed **7% worse** than belting them.

| Design | Red Circuit Method | UPS |
|--------|-------------------|-----|
| composite_04 | Belted | 1660 |
| composite_05 | Direct insert | 1543 |

The increased complexity and entity count from direct insertion outweighs the belt elimination benefits for this specific use case.

### Does the red circuit block layout matter?

**Layout matters less than proper clocking.** When both designs are properly clocked to the same output rate (200/s), there was negligible difference between different layouts (composite_01 vs composite_02 both achieved ~1333 UPS).

---

## Steel Handling

### Should you direct insert steel or belt it?

**Direct insert steel from foundries** performs better than belting. The baseline design which belted steel performed worst in the competition.

### Should you clock steel inserters from foundries?

**No.** Testing showed that unclocked steel inserters with a 4-slot buffer performed slightly better than clocked versions.

| Variant | Whole Update (µs) |
|---------|------------------|
| Unclocked + 4 slot buffer | 591 |
| Clocked steel | 598 |

---

## Productivity Module Production

### Should you use inserter chains or direct insertion?

**Direct insertion is better than inserter chains.**

Designs using chest buffers for plastic and copper wire performed measurably worse. The top two productivity module designs were fully direct insertion.

| Design Type | Best Whole Update (µs) |
|-------------|------------------------|
| Full DI | 591 |
| Chest chains | 635+ |

### Should you use cars as buffers?

If you must use cars in a chest chain, **clock the inputs to the car** rather than relying on wakelists. Unclocked cars constantly check if they're moving every tick.

| Car Method | Whole Update (µs) |
|------------|------------------|
| Clocked input + 1 slot | 597 |
| Clocked input | 607 |
| Unclocked wakelist | 627 |

---

## Rail Production

### Should you direct insert stone into rail assemblers?

**Yes, absolutely.** The best performing design (composite_04) uses direct insert mining drills for stone in the production science blocks.

This single change—swapping a belt-fed stack inserter with a direct insert mining drill—was the key differentiator that made composite_04 the fastest design at **1660 UPS**, surpassing all round 2 competition entries.

![Rail block comparison](screenshots/35_composite_04_purple_block_comparison.png)

---

## Inserter Clocking Guidelines

### When to clock inserters

| Scenario | Clock? | Reason |
|----------|--------|--------|
| High craft rate outputs (>15/s) | **Yes** | Reduces wake events |
| Inputs to high craft rate buildings | **Yes** | Reduces wake events |
| Mining drills (DI into furnaces) | **Yes** | Reduces intermediate transfer |
| Brick output from furnaces | **Yes** | Worth the overhead |
| Red circuit input | **Yes** | Worth the overhead |
| Stone input from belt | **No** | Overhead exceeds benefit |
| Steel from foundry | **No** | Overhead exceeds benefit |
| Green circuit inputs | **No** | Craft rate too low |

### Clocking principle

The benefit of clocking comes from reducing **wake list events**. Buildings with high craft rates (like advanced circuits at 45+/s or prod modules at 15/s) trigger many wake events per second. Clocking the inserters feeding these buildings reduces entity updates significantly.

Low craft rate items don't trigger enough wake events to justify the additional circuit network overhead from clocking.

---

## Belt Design Principles

### Pull from straight belts, not undergrounds

Pulling from undergrounds for constantly moving belts is worse than pulling from straight belts.

---

## Summary: The Optimal Design

The winning design (composite_04 at **1660 UPS**) incorporated:

1. **On-patch furnace production** (80/s block)
2. **Belted red circuits** (not direct insert)
3. **Direct insert mining drills for stone** in production science blocks
4. **Properly clocked** high-craft-rate building inputs
5. **200% stone patch size** (balance between patch availability and design fit)

![Best design](screenshots/35_composite_04.png)

This design achieved 4% better performance than the best round 2 competition entry and 26% better than off-patch belted designs.
