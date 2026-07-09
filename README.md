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

This repository uses [Git LFS](https://git-lfs.com/) to store large files. The following are tracked via LFS and served from Cloudflare R2:

- **`.zip`** — Factorio save files (all directories)
- **`.csv`** — Benchmark result data (`benchmarks/` and `competitions/`)

You must have Git LFS installed before cloning or contributing, otherwise these files will appear as small pointer text files instead of their actual contents.

**Setup:**

1. Install Git LFS: https://git-lfs.com/
2. Enable it for your git installation (one-time, per machine):
   ```
   git lfs install
   ```

#### Cloning — download only what you need

There are hundreds of benchmark save files and result CSVs in this repo. To avoid downloading all of them at once, clone with LFS smudging disabled and then pull only what you need:

```sh
GIT_LFS_SKIP_SMUDGE=1 git clone <repo-url>
cd factorio-benchmarks

# Pull saves and results for a specific benchmark
git lfs pull --include="benchmarks/2026-07-03-mining-drill-performance-2.1.9/**"

# Or pull everything from a top-level folder (saves + CSVs)
git lfs pull --include="benchmarks/**"
```

To download everything at once (not recommended on metered connections):
```sh
git clone <repo-url>
```

If you already cloned without LFS, fetch specific files with:
```sh
git lfs pull --include="<path/to/benchmark>/**"
```

#### Adding new benchmark save files

Simply `git add` the `.zip` as normal — the `.gitattributes` rule routes it through LFS automatically:

```sh
git add benchmarks/my-new-benchmark/save.zip
git commit -m "add save file"
git push
```

Uploading requires an upload token. Set it once per clone using `git-credential-store`:

```sh
# 1. Tell git to use the credential store for the LFS server
git config --local \
  'credential.https://factorio-lfs.abucnasty.workers.dev.helper' \
  store

# 2. Write the credentials to ~/.git-credentials
printf 'https://lfs:<your-upload-token>@factorio-lfs.abucnasty.workers.dev\n' \
  >> ~/.git-credentials
chmod 600 ~/.git-credentials
```

Contact @abucnasty for an upload token.

> **Note:** Do not use `lfs.<url>.Authorization` — git-lfs ignores it once
> `access=basic` is cached in `.git/config` (which happens automatically on the
> first auth negotiation). The credential-store approach works reliably.

#### Troubleshooting

**VS Code shows a username/password dialog for `factorio-lfs.abucnasty.workers.dev`**

This happens because git-lfs cached `access=basic` in `.git/config` and VS Code's
credential helper is intercepting the request. Fix:

```sh
# 1. Remove the cached access type
git config --local --unset 'lfs.https://factorio-lfs.abucnasty.workers.dev.access'

# 2. Make sure credentials are stored (see upload setup above)
printf 'protocol=https\nhost=factorio-lfs.abucnasty.workers.dev\n' | git credential fill
# Should print: username=lfs  password=<token>
# If empty, re-run the credential-store setup above.
```

