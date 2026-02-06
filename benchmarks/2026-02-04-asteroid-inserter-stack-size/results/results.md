# Factorio Benchmark Results

**Platform:** linux-x86_64
**Factorio Version:** 2.0.73
**Date:** 2026-02-04

## Scenario
* Each save was tested for 60000 tick(s) and 16 run(s)

## Results
| Metric            | Description                           |
| ----------------- | ------------------------------------- |
| **Mean UPS**      | Updates per second – higher is better |
| **Mean Avg (ms)** | Average frame time – lower is better  |
| **Mean Min (ms)** | Minimum frame time – lower is better  |
| **Mean Max (ms)** | Maximum frame time – lower is better  |

| Save | Avg (ms) | Min (ms) | Max (ms) | UPS | Execution Time (ms) | % Difference from base |
|------|----------|----------|----------|-----|---------------------|------------------------|
| stack_12_green | 0.681 | 0.412 | 53.067 | 1468 | 163446 | 0.00% |
| stack_1_blue | 0.676 | 0.415 | 52.644 | 1480 | 162090 | 0.84% |
| stack_1_green | 0.673 | 0.417 | 53.463 | 1484 | 161648 | 1.11% |
| stack_4_blue | 0.672 | 0.416 | 51.346 | **1487** | 161369 | 1.29% |

## Memory (mimalloc)

### What these numbers mean (practical interpretation)
| Field | What it roughly indicates |
|------|----------------------------|
| **Committed (peak)** | Highest amount of memory backed by the OS during the run (best "memory footprint" trend metric). |
| **Reserved (peak)** | Highest virtual address space reserved by the allocator. **If Committed > Reserved, the application uses direct `mmap`/`VirtualAlloc` outside the allocator** (e.g., for memory-mapped files or custom pools). |
| **Peak RSS** | Highest resident set size (what was actually in RAM). Large gaps between Committed and RSS indicate sparse memory usage (hugepages, memory-mapped files, or reserved-but-untouched arenas). |
| **Commit Efficiency** | `(Peak RSS / Committed Peak)` as percentage. <10% = sparse allocation (mostly reserved, not touched); >80% = dense working set. |
| **Committed/Reserved (current)** | What the allocator still held at process exit. Not automatically a leak—mimalloc retains arenas for reuse. **Trend this across multiple runs; growth between identical runs indicates leaks.** |
| **Pages / Abandoned (current + status)** | "Not all freed" is **normal**—the allocator caches pages for reuse. Abandoned blocks indicate thread-local heap fragments from terminated threads. Flag only if these numbers grow across benchmark iterations. |
| **Thread Churn** | `(Threads Peak - Current)`. Values >0 indicate short-lived worker threads spawned during initialization (explains Abandoned blocks). |
| **Threads (peak)** | Peak allocator thread count observed. If Peak > Current, expect elevated Abandoned blocks. |
| **mmaps** | Number of OS allocation calls. Low counts (<50) with high memory usage indicate efficient arena reuse. High counts indicate frequent allocation pressure or fragmentation. |
| **purges / resets** | Memory returned to OS. Usually 0 in benchmarks—non-zero indicates aggressive memory trimming or constrained environments. |

### Summary (end-of-run heap stats)
| Save | Committed Peak | Peak RSS | Commit Efficiency | Reserved Peak | Committed Current | Reserved Current | Pages Current | Pages Status | Abandoned Current | Abandoned Status | Thread Churn | Threads Peak | mmaps | purges | resets |
|------|----------------|----------|-------------------|---------------|-------------------|------------------|---------------|-------------|-------------------|------------------|--------------|-------------|-------|--------|--------|
| stack_12_green | 8.3 GiB | 46.2 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.2 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_12_green | 8.3 GiB | 46.2 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.2 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_12_green | 8.3 GiB | 46.0 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.2 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_12_green | 8.3 GiB | 46.1 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.2 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_1_blue | 8.3 GiB | 46.5 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.1 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_1_blue | 8.3 GiB | 46.0 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.1 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_1_blue | 8.3 GiB | 48.4 MiB | 0.6% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.1 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_1_blue | 8.3 GiB | 46.2 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.1 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_1_green | 8.3 GiB | 46.2 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.2 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_1_green | 8.3 GiB | 45.8 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.2 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_1_green | 8.3 GiB | 46.8 MiB | 0.6% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.2 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_1_green | 8.3 GiB | 46.3 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.2 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_4_blue | 8.3 GiB | 45.8 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.1 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_4_blue | 8.3 GiB | 46.0 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.1 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_4_blue | 8.3 GiB | 48.1 MiB | 0.6% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.1 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |
| stack_4_blue | 8.3 GiB | 46.3 MiB | 0.5% | 8.0 GiB | 8.3 GiB | 8.0 GiB | 1.1 Ki | not all freed | 2.6 Ki | not all freed | 4 | 16 | 2 | 0 | 0 |

## Conclusion