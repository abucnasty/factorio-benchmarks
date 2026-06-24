# Overview
This is a project space for factorio related discovery.


## Blueprints
Blueprints that have been made publically available.

[blueprints](./docs/blueprints/README.md)

## Factorio Benchmarks
[benchmarks](/benchmarks)

This directory contains the following:
1. performance benchmark runs
2. save files
3. data results
4. conclusion files in markdown notation

## UPS Wars

A series of community-driven competitions to discover the most UPS-efficient designs for science production in Factorio. Participants submit factory blueprints that are rigorously benchmarked to determine optimal approaches for large-scale manufacturing.

### 2025 Q1 Nauvis Science Competition

A comprehensive competition series covering vanilla plus space age Nauvis science packs with dozens of contributed designs across multiple science types.

| Science Type | Entries | Description |
|-------------|---------|-------------|
| [Automation Science](competitions/2025-Q1-Nauvis/automation-science/README.md) | 18 designs | Red science production using techniques like direct insertion, fluid buses, and lead-follower control |
| [Logistics Science](competitions/2025-Q1-Nauvis/logistics-science/README.md) | 21 designs | Green science with molten fluid buses, wagon tech, and various belt configurations |
| [Chemical Science](competitions/2025-Q1-Nauvis/chemical-science/README.md) | 30+ designs | Blue science featuring multi-round elimination brackets, hybrid designs, and component testing |
| [Production Science](competitions/2025-Q1-Nauvis/production-science/README.md) | 36 designs | Purple science with separate furnace and productivity module benchmarks, plus composite analysis |

## Simulators
[simulators](/simulators)

WIP simulator for calculating quality ratios for use in designs

## Contributing

### Git LFS (Large File Storage)

This repository uses [Git LFS](https://git-lfs.com/) to store Factorio save files (`.zip`). You must have Git LFS installed before cloning or contributing, otherwise zip files will appear as small pointer text files instead of actual saves.

**Setup:**

1. Install Git LFS: https://git-lfs.com/
2. Enable it for your git installation (one-time, per machine):
   ```
   git lfs install
   ```
3. Clone the repo normally — LFS files will be fetched automatically:
   ```
   git clone <repo-url>
   ```

If you already cloned without LFS, fetch the actual files with:
```
git lfs pull
```

When adding new benchmark save files, simply `git add` the `.zip` as normal — the `.gitattributes` rule will route them through LFS automatically.