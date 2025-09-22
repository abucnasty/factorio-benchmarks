# How to Benchmark in Factorio Using `belt` and VS Code

This guide will walk you through benchmarking performance in **Factorio** using [`belt`](https://github.com/florishafkenscheid/belt), a Rust-based command-line tool, with **Visual Studio Code** for optional code/config inspection.

## Table of Contents
- [How to Benchmark in Factorio Using `belt` and VS Code](#how-to-benchmark-in-factorio-using-belt-and-vs-code)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Step 1: Install `belt`](#step-1-install-belt)
  - [Step 2: Prepare a Save File in Factorio](#step-2-prepare-a-save-file-in-factorio)
    - [Step 2.1: Generate a Test Map](#step-21-generate-a-test-map)
    - [Step 2.2: Creating Your Scenario](#step-22-creating-your-scenario)
    - [Step 2.3: Save Your Map As Something You Will Remember](#step-23-save-your-map-as-something-you-will-remember)
  - [Step 3: Run the Benchmark](#step-3-run-the-benchmark)
  - [Step 4: Read and Compare Results](#step-4-read-and-compare-results)
  - [Benchmarking Tips](#benchmarking-tips)


## Prerequisites

Make sure the following are installed:

* **Factorio** (Steam or standalone)
* **Rust** and **Cargo**: [Install Rust](https://rust-lang.org/tools/install)
* **Visual Studio Code** (optional, for editing/inspection)
* **Git** (optional, if you're cloning the repo)
* **Mods** [Region Cloner](https://mods.factorio.com/mod/region-cloner), [Editor Extensions](https://mods.factorio.com/mod/editorextensions) (recommended)

## Step 1: Install `belt`

You can install the `belt` CLI directly from [crates.io](https://crates.io/crates/factorio-belt):

```bash
cargo install belt
```

After installation, the `belt` binary will be available in your Cargo bin path.

Make sure Cargo’s bin directory is in your PATH, to verify:
```bash
belt --help
```

## Step 2: Prepare a Save File in Factorio

### Step 2.1: Generate a Test Map
1. Launch **Factorio** and go to the main menu.
2. Click **Single Player**, then **New Game**.
3. In the left panel, select **Sandbox**, then click **Next**.
4. In the top tabs, go to the **Enemy** tab and uncheck **Enemies**.
5. Switch to the **Advanced** tab and uncheck **Pollution**.
6. Click **Play** to generate the map.
7. Once loaded, use the menu in the top-left to apply sandbox utilities like unlocking all technologies or enabling always-daylight, depending on your testing needs.
   1. if you use editor extensions you can just type `/cheat` to unlock all technologies and put you into the editor
   2. optionally, research specific technologies more quickly by pressing shift and clicking on the research button to instantly research that technology
8. Press the chat key (typically `or ~) and enter`/editor\` to open the map editor.
9.  In the editor UI, go to the **Surfaces** tab:
   * Click **Remove all Entities**
   * Click **Fill with Lab Tiles**
   * Enable **Generate new chunks with lab tiles**
10. In **map generation settings**, make sure the following are disabled:
    * Pollution
    * Enemies

### Step 2.2: Creating Your Scenario

> (Optional) Use the **Editor Extensions** and **Region Cloner** mods to speed up the process of building and duplicating your test setup.


1.  Copy your blueprint into your world and feed all the input materials you need for your build
2.  Copy the blueprint enough times until the overall load on your cpu is over at least 2 ms of update time
    1.  if your save file doesn't create enough load on your CPU, there is a high likelyhood you will encounter noise in the test
    2.  region cloner can greatly speed up this process
3.  Validate your design is running as intended


> Keep in mind that your benchmark simulations always start from the exact state saved in your map file.

### Step 2.3: Save Your Map As Something You Will Remember
When organizing your benchmark tests, give each test series a clear and distinct name, followed by version numbers for the different maps you want to compare. Optionally, you can navigate to your save file folder in your OS file explorer and create a folder where your maps for a specific benchmark will all be to make organization easy.

Factorios save file folder is commonly found here:
- **Windows**: `C:\Users\<you>\AppData\Roaming\Factorio\saves\`
- **Linux**: `~/.factorio/saves/`
- **Mac**: `~/Library/Application Support/factorio`

Example:
- folder: benchmark_2025_07_26_inserter_clocking
  - `benchmark_inserter_clocked_enable`
  - `benchmark_inserter_clocked_set_filter`
  - `benchmark_inserter_wake_list`

Make sure to write down the differences between save files so you do not forget.

Personal recommendation: copy these save files somewhere else and store them with your other benchmarks to create a colleciton of benchmarks and sub folders per benchmark to make organization easy. See the benchmarks folder in this repo as an example.


## Step 3: Run the Benchmark

Use the `belt` to execute the benchmark:

```bash
belt benchmark <save folder> --ticks <ticks> --runs <runs>
```

Example when you are executing the command in the active directory where the save files are stored and you want to run it for 3600 ticks and 5 runs per save file

```bash
belt benchmark . --ticks 3600 --runs 5
```

This runs **Factorio in headless mode**, simulates 60 seconds of in-game time, and logs UPS stats.

For more options, refer to the official documentation [here](https://github.com/florishafkenscheid/belt).

## Step 4: Read and Compare Results

>  Many benchmarking errors stem from incorrect test map setups. Be sure to carefully review your maps both before and after running benchmarks to catch any issues or mistakes—especially when cloning sections. Use the /editor mode to inspect your map, and pause the game with the Time tab. This tab lets you advance the simulation tick-by-tick or specify a number of ticks to run before pausing again.

The results will be written to the directory where `belt` was executed in. To change this, specify the `--output` option.

## Benchmarking Tips

* Avoid background CPU usage while testing.
* Set your PC fans to 100% if possible to avoid thermal throttling
* Run multiple tests and average the results.
* Minimize mods unless they are part of the benchmark.
* Trust, but verify your results.
* Changing the run order using the `--run-order` command can help with running the benchmarks in sequential or random order. This is helpful for preventing bias due to programs running in the background for one save file and not others.