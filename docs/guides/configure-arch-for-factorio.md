# Setting Up Arch to Run Factorio

## Prerequisites

This guide will not explain how to install Arch itself, there's great resources for that online, namely [the official guide](https://wiki.archlinux.org/title/Installation_guide)

## Library and Software Installations

### Install Factorio

We want to install the standalone copy (not steam) for this guide. You can download the game by linking your steam account on factorios website or purchasing the game directly from their website: https://factorio.com/download

It will come as a zip file, extract the contents to a place you will remember and write down the place you copied the contents to as we will need it later.

For this guide, factorio was placed under the home directory in a folder called `.factorio`.

In this example and for the purposes of this guide, the factorio binary is located here:

```
~/.factorio/bin/x64/factorio
```

### Gamemode

Reference: https://github.com/FeralInteractive/gamemode

Open your terminal and use your preferred package manager to install the `gamemode` package.
Next, you'll want to add your user to the `gamemode` group.

```sh
sudo gpasswd -a $USER gamemode
```

### Mimalloc

Reference: https://github.com/microsoft/mimalloc

In your terminal, use your preferred package manager to install the `mimalloc` package. Make sure the version is atleast 3.0. At the time of writing, mimalloc is at 3.2.8-1.

## Configuring Huge Pages

### Why?

You may want to enable huge pages to boost the game further by making use of huge 1GB pages. Keep in mind that the amount of RAM you have directly determines how many pages you want to allocate to factorio. Using this method will preallocate the number of pages you specify and make it unavailable to any other application so use with caution. This also comes with the downside of having to disable background saves in linux.

The number of pages you should allocate to factorio is highly dependent on the save file you are going to run. The example save file that is used is a megabase by abucnasty that takes 10.5 GB of RAM to run. We will allocate 10 pages here so we can encapsulate almost all of the ram in huge pages.

### Bootflags

In your [kernel parameters](https://wiki.archlinux.org/title/Kernel_parameters) you'll want to add some flags to enable huge pages. To boot with 10 pages of 1GiB size, simply append `hugepagesz=1G hugepages=10 default_hugepagesz=2M` to your kernel parameters.
If you don't want to always boot with 10GiB of huge pages, you can look at the next section on how to edit your huge page count at runtime.

> [!NOTE]
> This is not required, as runtime editing will do the same thing, but this guarantees there is enough space in memory to actually allocate 10 whole 1GiB pages.
> Runtime editing WILL FAIL 9 out of 10 times if you have already been using your machine, as memory will be fragmented, and there won't be enough 1GiB free areas of contiguous memory.

### Runtime editing

There are two main ways to influence your hugepages at runtime. `hugeadm` and manually writing to `/sys/kernel/mm/hugepages/hugepages-1048576kB/nr_hugepages`.

> [!IMPORTANT]
> Increasing your hugepage count at runtime is highly dependant on the fragmentation of memory that has already occurred.
> It is a good idea to reboot, to wipe your RAM, and then increase the amount of hugepages allocated.

#### hugeadm

`hugeadm` is a command which can manage huge pages for you. It is part of the library `libhugetlbfs`, which can be installed via the AUR at `libhugetlbfs`.

**Examples**:
Set the hugepage count to 0:

```sh
sudo hugeadm --pool-pages-min 1G:0 --pool-pages-max 1G:0
```

Set the hugepage count to 10:

```sh
sudo hugeadm --pool-pages-min 1G:10 --pool-pages-max 1G:10
```

#### Manual

```sh
echo 10 > /sys/kernel/mm/hugepages/hugepages-1048576kB/nr_hugepages
```

To verify how many pages are allocated:

```sh
grep -R . /sys/kernel/mm/hugepages/hugepages-*/nr_hugepages && grep -R . /sys/kernel/mm/hugepages/hugepages-*/free_hugepages
```

You should see a print out like the following:

```
/sys/kernel/mm/hugepages/hugepages-1048576kB/nr_hugepages:10
/sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages:0
/sys/kernel/mm/hugepages/hugepages-1048576kB/free_hugepages:10
/sys/kernel/mm/hugepages/hugepages-2048kB/free_hugepages:0
```

## Launching Factorio

Let's set up a script to run Factorio with mimalloc, and using the allocated huge pages.

```sh
#!/usr/bin/env bash
set -euo pipefail

# Path to Factorio
FACTORIO_BIN="${HOME}/.factorio/bin/x64/factorio"
# Path to mimalloc library
MIMALLOC_SO="/usr/lib/libmimalloc.so"
# The amount of pages to allocate to mimalloc
TARGET_RUNTIME_PAGES=10

# MIMALLOC_RESERVE_HUGE_OS_PAGES=N: where N is the number of 1GiB huge OS pages.
export MIMALLOC_RESERVE_HUGE_OS_PAGES=$TARGET_RUNTIME_PAGES
# MIMALLOC_PURGE_DELAY=N: the delay in N milli-seconds (by default 10) after which mimalloc will purge OS pages that are not in use.
# Setting to -1 disables purging.
export MIMALLOC_PURGE_DELAY=-1
# Shows stats on program termination. (Parsed by BELT)
# 0 = false, 1 = true
export MIMALLOC_SHOW_STATS=1

# Flags to always pass to Factorio
FACTORIO_FLAGS=(
  "--cache-sprite-atlas=true"
)

# Run with gamemode when available.
RUNNER=()
if command -v gamemoderun >/dev/null 2>&1; then
  RUNNER=(gamemoderun)
fi

env LD_PRELOAD="${MIMALLOC_SO}" \
  "${RUNNER[@]}" \
  "${FACTORIO_BIN}" \
  "${FACTORIO_FLAGS[@]}" \
  "$@"
```

Copy the above contents into a shell file. For this example, we will put it under the `~/.local/bin` directory.

```sh
cd ~/.local/bin
nano factorio-mimalloc-huge-pages
chmod +x factorio-mimalloc-huge-pages
```

### Creating a Desktop Icon

To wrap everything up, let's make a nice desktop launch icon so we ca start the game at any time directly from the desktop.

Create a file on your desktop (or `/usr/share/applications/` for dmenu / app launcher usage) called `factorio.desktop`. Open it in a text editor and add the following to it (change your username / path to the shell script we created above).

```desktop
[Desktop Entry]
Type=Application
Exec=/home/<YOUR USER>/.local/bin/factorio-mimalloc-huge-pages
Icon=engineer_q5
Terminal=false
Categories=Game
```

The icon can be any png, but if you want to use the exact icon in the example it is available here:

![64x64 Factorio logo](images/engineer_q5.png)

Put it under `~/.local/share/icons/hicolor/64x64/apps/engineer_q5.png`.

Having a separate icon is convenient for making it obvious when you are running factorio without mimalloc / huge pages but is completely optional.

Now you will have a desktop launcher to start the game with mimalloc and huge pages enabled directly from the desktop.
