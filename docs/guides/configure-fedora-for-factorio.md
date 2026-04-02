# Setting Up Fedora to Run Factorio

## Library and Software Installations
### Install Factorio

We want to install the standalone copy (not steam) for this guide. You can download the game by linking your steam account on factorios website or purchasing the game directly from their website: https://factorio.com/download

It will come as a zip file, extract the contents to a place you will remember and write down the place you copied the contents to as we will need it later.

For this guide, factorio was placed under the home directory under a folder called `Games`.

In this example and for the purposes of this guide, the factorio binary is located here:
```
~/Games/factorio/bin/x64/factorio
```

### Gamemode
Reference: https://github.com/FeralInteractive/gamemode

Open a terminal.

Execute the following command to install the prerequisites:
```sh
sudo dnf install meson systemd-devel pkg-config git dbus-devel inih-devel
```

Go to a directory where you want to download gamemode. For this example this will be the home directory:
```sh
cd ~ # takes you to the home directory for your user
```

```sh
git clone https://github.com/FeralInteractive/gamemode.git
cd gamemode
git checkout 1.8.2 # omit to build the master branch
./bootstrap.sh
sudo gpasswd -a $USER gamemode
```

### Mimalloc

Reference: https://github.com/microsoft/mimalloc.git

At the time of writing this article (2026-04-02) fedoras package manager only comes with mimalloc version 2 that can be installed. In order to install version 3 which has some improvements to performance, we will build it from source.

Open a terminal and install development tools:
```sh
sudo dnf group install development-tools
sudo dnf install cmake
```

Go to a directory within which you want mimalloc to be downloaded. We will use the home directory again as an example.

```sh
cd ~
```

Next we will clone the project from github:
```
git clone https://github.com/microsoft/mimalloc.git
```
> Note: if you don't have git installed you can install it by executing `sudo dnf install git`

Next we will switch to the dev3 branch:
```sh
cd mimalloc
git switch dev3
```

Finally we will create a release directory and build mimalloc:

```sh
mkdir -p out/release
cd out/release
cmake ../..
make
```

You should now see a file called `libmimalloc.so` in the release directory. Take note of the absolute file path to this file as we will need it to inject the library into factorio. For this tutorial, since these operations were done in the home directory, the file path would be:
```
~/mimalloc/out/release/libmimalloc.so
```

### Injecting Mimalloc into Factorio

To inject the library we just built, we pass in the `LD_PRELOAD` context environment variable before invoking the game.

The `LD_PRELOAD` environment variable must be an absolute path to where you installed mimalloc. Since in this example, we put it under the user directory we need to expand this to the full directory and cannot simply prefix it with `~`.

The user name in this example is going to be `abucnasty`.

```sh
LD_PRELOAD=/home/abucnasty/mimalloc/out/release/libmimalloc.so /home/abucnasty/Games/factorio/bin/x64/factorio
```

This will start the game with mimalloc.

We can use gamemode to prioritize factorio by slightly modifying the above script.

```sh
LD_PRELOAD=/home/abucnasty/mimalloc/out/release/libmimalloc.so gamemoderun /home/abucnasty/Games/factorio/bin/x64/factorio
```




### Configuring Huge Pages

You may want to enable huge pages to boost the game further by making use of huge 1GB pages. Keep in mind that the amount of RAM you have directly determines how many pages you want to allocate to factorio. Using this method will preallocate the number of pages you specify and make it unavailable to any other application so use with caution. This also comes with the downside of having to disable background saves in linux.

The number of pages you should allocate to factorio is highly dependent on the save file you are going to run. The example save file that is used is a megabase by abucnasty that takes 10.5 GB of RAM to run. We will allocate 10 pages here so we can encapsulate almost all of the ram in huge pages.


To enable large pages, on a fresh reboot open a terminal and get root level access:
```sh
sudo -s
```

Next allocate 10 GB of huge pages (change the number for the number of pages you want to allocate)
```sh
echo 10 > /sys/kernel/mm/hugepages/hugepages-1048576kB/nr_hugepages
```

Test that the pages are allocated:
```sh
grep -R . /sys/kernel/mm/hugepages/hugepages-/nr_hugepages && grep -R . /sys/kernel/mm/hugepages/hugepages-/free_hugepages
```

You should see a print out like the following:
```
/sys/kernel/mm/hugepages/hugepages-1048576kB/nr_hugepages:10
/sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages:0
/sys/kernel/mm/hugepages/hugepages-1048576kB/free_hugepages:10
/sys/kernel/mm/hugepages/hugepages-2048kB/free_hugepages:0
```

To use this with mimalloc, we need to set a few more launch options in order for it to make use of huge pages:

```sh
# MIMALLOC_RESERVE_HUGE_OS_PAGES=N: where N is the number of 1GiB huge OS pages.
MIMALLOC_RESERVE_HUGE_OS_PAGES=10
```

We can test this by opening a new terminal and running:
```sh
MIMALLOC_RESERVE_HUGE_OS_PAGES=10 LD_PRELOAD=/home/abucnasty/mimalloc/out/release/libmimalloc.so gamemoderun /home/abucnasty/Games/factorio/bin/x64/factorio
```

You can verify factorio is using the pages by opening the terminal with root access and executing:

```sh
grep -R . /sys/kernel/mm/hugepages/hugepages-/nr_hugepages && grep -R . /sys/kernel/mm/hugepages/hugepages-/free_hugepages
```

It should now print out:

```sh
/sys/kernel/mm/hugepages/hugepages-1048576kB/nr_hugepages:10
/sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages:0
/sys/kernel/mm/hugepages/hugepages-1048576kB/free_hugepages:0 # this should now be less than 10
/sys/kernel/mm/hugepages/hugepages-2048kB/free_hugepages:0
```

## Desktop Configuration
### Create Launch Shell Scripts

For convenience, we want to be able to launch the game in one command and not worry about entering a lot of things into a terminal every time we want to go play factorio.

The below script is based on the examples above assuming that you have huge pages enabled and have built mimalloc.


```sh
#!/usr/bin/env bash
set -euo pipefail

# Path to Factorio
FACTORIO_BIN="${HOME}/Games/factorio/bin/x64/factorio"
# Path to mimalloc library
MIMALLOC_SO="${HOME}/mimalloc/out/release/libmimalloc.so"

# MIMALLOC_RESERVE_HUGE_OS_PAGES=N: where N is the number of 1GiB huge OS pages.
export MIMALLOC_RESERVE_HUGE_OS_PAGES=10
# MIMALLOC_PURGE_DELAY=N: the delay in N milli-seconds (by default 10) after which mimalloc will purge OS pages that are not in use.
# Setting to -1 disables purging.
export MIMALLOC_PURGE_DELAY=-1
# Shows stats on program termination
export MIMALLOC_SHOW_STATS=0

# Flags to always pass to Factorio
FACTORIO_FLAGS=(
  "--cache-sprite-atlas=true"
)

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

Copy the above contents into a shell file. For this example, we will put it under `~/.local/bin` directory.

```sh
cd ~/.local/bin
touch factorio-mimalloc-huge-pages
chmod +x factorio-mimalloc-huge-pages
```

open the file you just created in a text editor and paste contents of the above shell script.

### Creating a Desktop Icon

To wrap everything up, let's make a nice desktop launch icon so we can start the game at any time directly from the desktop.

Create a file on your desktop called "Factorio". Open it in a text editor and add the following to it (change your username / path to the shell script we created above).

```
#!/usr/bin/env xdg-open
[Desktop Entry]
Type=Application
Name=Factorio (huge pages)
Exec=/home/abucnasty/.local/bin/factorio-mimalloc-huge-pages
Icon=/home/abucnasty/.local/share/applications/engineer_q5.png
Terminal=false
Categories=Game
```

The icon can be any png, but if you want to use the exact icon in the example it is available here:

![alt text](images/engineer_q5.png)

Having a separate icon is convenient for making it obvious when you are running factorio without mimalloc / huge pages but is completely optional. 

Now you will have a desktop launcher to start the game with mimalloc and huge pages enabled directly from the desktop.

