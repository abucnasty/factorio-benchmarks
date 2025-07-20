#!/bin/bash

# A Factorio Benchmark Bash Script
# Converted from PowerShell version by Tapani Kiiskinen
# Author: Converted to bash for cross-platform use
# Version: v1.0.0

# Exit on any error
set -e

# Default configuration (matching PowerShell script structure)
DEFAULT_CONFIG_PATH="$HOME/.factorio"
DEFAULT_SAVE_PATH="$PWD" 
DEFAULT_EXECUTABLE=""
DEFAULT_PLATFORM="LinuxSteam"
DEFAULT_NOTES=""
DEFAULT_OUTPUT_NAME="test_results"
DEFAULT_OUTPUT_NAME_VERBOSE="Verbose Results"
DEFAULT_OUTPUT_FOLDER="./"
DEFAULT_FORCE_CSV=false
DEFAULT_USE_PATTERN_AS_OUTPUT_PREFIX=false
DEFAULT_KEEP_LOGS=false
DEFAULT_CLEAR_OUTPUT_FILE=false
DEFAULT_ENABLE_MODS=false
DEFAULT_BENCHMARK_MOD_FOLDER="./benchmark-mods/"
DEFAULT_VERBOSE_RESULT=false
DEFAULT_VERBOSE_ITEMS="tick,wholeUpdate,wholeUpdate,gameUpdate,circuitNetworkUpdate,transportLinesUpdate,fluidsUpdate,entityUpdate,electricNetworkUpdate,logisticManagerUpdate,trains,trainPathFinder"
# Initialize variables
ticks=""
runs=""
pattern=""
config_path="$DEFAULT_CONFIG_PATH"
save_path="$DEFAULT_SAVE_PATH"
executable="$DEFAULT_EXECUTABLE"
platform="$DEFAULT_PLATFORM"
notes="$DEFAULT_NOTES"
output_name="$DEFAULT_OUTPUT_NAME"
output_name_verbose="$DEFAULT_OUTPUT_NAME_VERBOSE"
output_folder="$DEFAULT_OUTPUT_FOLDER"
force_csv="$DEFAULT_FORCE_CSV"
use_pattern_as_output_prefix="$DEFAULT_USE_PATTERN_AS_OUTPUT_PREFIX"
keep_logs="$DEFAULT_KEEP_LOGS"
clear_output_file="$DEFAULT_CLEAR_OUTPUT_FILE"
enable_mods="$DEFAULT_ENABLE_MODS"
benchmark_mod_folder="$DEFAULT_BENCHMARK_MOD_FOLDER"
verbose_result="$DEFAULT_VERBOSE_RESULT"
verbose_items="$DEFAULT_VERBOSE_ITEMS"

# Function to show usage
show_usage() {
    cat << EOF
A Factorio Benchmark Bash Script
Converted from PowerShell version

Usage: $0 <ticks> <runs> [pattern] [options]

Required Parameters:
  ticks                Number of ticks to simulate for each benchmark run
  runs                 Number of times to repeat each benchmark

Optional Parameters:
  pattern              Filter save files by this pattern (default: all saves)

Options:
  -c, --config-path PATH           Factorio config directory (default: ~/.factorio)  
  -s, --save-path PATH             Factorio saves directory (default: current directory)
  -e, --executable PATH            Path to Factorio executable (auto-detected if not specified)
  -p, --platform TEXT              Platform identifier for logging (default: LinuxSteam)
  -n, --notes TEXT                 Add notes to the results
  --output-name NAME               Base output filename (default: test_results)
  --output-name-verbose NAME       Verbose output filename (default: Verbose Results)
  -o, --output-folder PATH         Output folder for results (default: ./)
  --force-csv                      Force CSV output instead of detecting formats
  --use-pattern-as-prefix          Add pattern string to output files as prefix
  --keep-logs                      Preserve raw Factorio logs
  --clear-output                   Clear output file before running
  --enable-mods                    Use normal mods (default: separate benchmark mods)
  --benchmark-mod-folder PATH      Benchmark mod folder (default: ./benchmark-mods/)
  --verbose                        Enable verbose mode with per-tick data
  --verbose-items LIST             Comma-separated list of verbose items to track
  -h, --help                       Show this help message

Examples:
  $0 6000 1                                    # Benchmark all saves for 6000 ticks, 1 run
  $0 1000 3 "Benchmark"                       # Benchmark saves matching "Benchmark" pattern
  $0 6000 5 --executable /opt/factorio/bin/x64/factorio --notes "Test run"

Factorio executable auto-detection paths:
  - Steam (Linux): ~/.steam/steam/steamapps/common/Factorio/bin/x64/factorio
  - Steam (macOS): ~/Library/Application Support/Steam/steamapps/common/Factorio/factorio.app/Contents/MacOS/factorio
  - Standalone: ./factorio, /usr/local/bin/factorio, /opt/factorio/bin/x64/factorio
EOF
}

# Function to detect Factorio executable
detect_factorio_executable() {
    local paths=(
        # Steam paths
        "$HOME/.steam/steam/steamapps/common/Factorio/bin/x64/factorio"
        "$HOME/.local/share/Steam/steamapps/common/Factorio/bin/x64/factorio"
        "$HOME/Library/Application Support/Steam/steamapps/common/Factorio/factorio.app/Contents/MacOS/factorio"
        # Standalone paths
        "./factorio"
        "/usr/local/bin/factorio"
        "/opt/factorio/bin/x64/factorio"
        "/usr/bin/factorio"
        # Flatpak
        "/var/lib/flatpak/app/com.factorio.Factorio/current/active/files/bin/factorio"
        "$HOME/.local/share/flatpak/app/com.factorio.Factorio/current/active/files/bin/factorio"
    )
    
    for path in "${paths[@]}"; do
        if [[ -x "$path" ]]; then
            echo "$path"
            return 0
        fi
    done
    
    # Try to find factorio in PATH
    if command -v factorio >/dev/null 2>&1; then
        echo "factorio"
        return 0
    fi
    
    return 1
}

# Function to set CPU priority
set_cpu_priority() {
    local pid=$1
    local priority=$2
    
    case "$priority" in
        "idle")
            renice 19 "$pid" >/dev/null 2>&1 || true
            ;;
        "low")
            renice 10 "$pid" >/dev/null 2>&1 || true
            ;;
        "normal")
            renice 0 "$pid" >/dev/null 2>&1 || true
            ;;
        "high")
            renice -10 "$pid" >/dev/null 2>&1 || true
            ;;
    esac
}

# Function to set CPU priority
set_cpu_priority() {
    local pid=$1
    local priority=$2
    
    case "$priority" in
        "idle")
            renice 19 "$pid" >/dev/null 2>&1 || true
            ;;
        "low")
            renice 10 "$pid" >/dev/null 2>&1 || true
            ;;
        "normal")
            renice 0 "$pid" >/dev/null 2>&1 || true
            ;;
        "high")
            renice -10 "$pid" >/dev/null 2>&1 || true
            ;;
    esac
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -c|--config-path)
            config_path="$2"
            shift 2
            ;;
        -s|--save-path)
            save_path="$2"
            shift 2
            ;;
        -e|--executable)
            executable="$2"
            shift 2
            ;;
        -p|--platform)
            platform="$2"
            shift 2
            ;;
        -n|--notes)
            notes="$2"
            shift 2
            ;;
        --output-name)
            output_name="$2"
            shift 2
            ;;
        --output-name-verbose)
            output_name_verbose="$2"
            shift 2
            ;;
        -o|--output-folder)
            output_folder="$2"
            shift 2
            ;;
        --force-csv)
            force_csv=true
            shift
            ;;
        --use-pattern-as-prefix)
            use_pattern_as_output_prefix=true
            shift
            ;;
        --keep-logs)
            keep_logs=true
            shift
            ;;
        --clear-output)
            clear_output_file=true
            shift
            ;;
        --enable-mods)
            enable_mods=true
            shift
            ;;
        --benchmark-mod-folder)
            benchmark_mod_folder="$2"
            shift 2
            ;;
        --verbose)
            verbose_result=true
            shift
            ;;
        --verbose-items)
            verbose_items="$2"
            shift 2
            ;;
        -*)
            echo "Unknown option: $1" >&2
            show_usage
            exit 1
            ;;
        *)
            if [[ -z "$ticks" ]]; then
                ticks="$1"
            elif [[ -z "$runs" ]]; then
                runs="$1"
            elif [[ -z "$pattern" ]]; then
                pattern="$1"
            else
                echo "Too many positional arguments" >&2
                show_usage
                exit 1
            fi
            shift
            ;;
    esac
done

# Validate required parameters
if [[ -z "$ticks" ]] || [[ -z "$runs" ]]; then
    echo "Error: ticks and runs are required parameters" >&2
    show_usage
    exit 1
fi

# Validate numeric parameters
if ! [[ "$ticks" =~ ^[0-9]+$ ]] || ! [[ "$runs" =~ ^[0-9]+$ ]]; then
    echo "Error: ticks and runs must be positive integers" >&2
    exit 1
fi

# Auto-detect Factorio executable if not provided
if [[ -z "$executable" ]]; then
    echo "Auto-detecting Factorio executable..."
    if ! executable=$(detect_factorio_executable); then
        echo "Error: Could not find Factorio executable. Please specify with -e/--executable" >&2
        exit 1
    fi
    echo "Found Factorio at: $executable"
fi

# Verify executable exists and is executable
if [[ ! -x "$executable" ]]; then
    echo "Error: Factorio executable not found or not executable: $executable" >&2
    exit 1
fi

# Verify save path exists
if [[ ! -d "$save_path" ]]; then
    echo "Error: Save path does not exist: $save_path" >&2
    exit 1
fi

# Collect saves to benchmark
echo ""
if [[ -n "$pattern" ]]; then
    mapfile -t saves < <(find "$save_path" -type f -name "*$pattern*" | sort)
    save_found_message="found matching pattern '$pattern'"
else
    mapfile -t saves < <(find "$save_path" -type f \( -name "*.zip" -o -name "*.dat" \) | sort)
    save_found_message="found in '$save_path'"
fi

if [[ ${#saves[@]} -eq 0 ]]; then
    echo "No saves $save_found_message."
    echo ""
    exit 0
fi

echo "Following saves $save_found_message:"
echo ""
for save in "${saves[@]}"; do
    basename "$save" | sed 's/\.[^.]*$//'
done
echo ""
echo -n "Executing benchmark after confirmation. Ctrl-c to cancel. "
read -r

# Check if Factorio is running (matching PowerShell .lock check)
lock_path="$config_path/.lock"
if [[ -f "$lock_path" ]]; then
    echo ""
    echo "WARNING: Factorio is currently running:"
    echo "    $lock_path exists"
    echo ""
    echo "Script will crash if Factorio is still running when continuing."
    echo ""
    echo -n "Ctrl-c to cancel. "
    read -r
fi

# Prepare output files
sanitized_pattern=""
if [[ "$use_pattern_as_output_prefix" == true && -n "$pattern" ]]; then
    # Remove illegal filename characters from pattern
    sanitized_pattern="${pattern//[^a-zA-Z0-9._-]/_} "
fi

output_file="$output_folder/${sanitized_pattern}${output_name}.csv"
output_file_verbose="$output_folder/${sanitized_pattern}${output_name_verbose}.xlsx"

# Create output folder
mkdir -p "$output_folder"

# Clear output files if requested
if [[ "$clear_output_file" == true ]]; then
    [[ -f "$output_file" ]] && rm "$output_file"
    [[ -f "$output_file_verbose" ]] && rm "$output_file_verbose"
fi

# CSV headers
csv_delimiter=","
headers="Save,Run,Startup time,End time,Avg ms,Min ms,Max ms,Ticks,Execution Time ms,Effective UPS,Version,Platform,Notes"

# Create output file with headers if it doesn't exist
if [[ ! -f "$output_file" ]]; then
    echo "$headers" > "$output_file"
fi

echo ""

# Main benchmark loop
for ((i = 0; i < runs; i++)); do
    for ((j = 0; j < ${#saves[@]}; j++)); do
        run=$((i + 1))
        save="${saves[j]}"
        save_name=$(basename "$save" | sed 's/\.[^.]*$//')
        run_name="$save_name Run $run"
        run_name_short="$save_name R$run"
        log_path="$output_folder/$run_name.log"

        echo -n "Benchmarking $run_name"$'\t'

        # Build argument list
        arg_list=(
            "--benchmark" "$save"
            "--benchmark-ticks" "$ticks"
            "--disable-audio"
        )

        if [[ "$verbose_result" == true ]]; then
            arg_list+=("--benchmark-verbose" "$verbose_items")
        fi

        if [[ "$enable_mods" == false ]]; then
            arg_list+=("--mod-directory" "$benchmark_mod_folder")
        fi

        # Run Factorio
        "$executable" "${arg_list[@]}" > "$log_path" 2>&1 &
        factorio_pid=$!

        # Wait for process to finish
        wait "$factorio_pid"

        # Clean up log data (remove leading spaces)
        sed -i 's/^[[:space:]]*//' "$log_path"

        # Parse data from log (matching PowerShell parsing logic)
        avg=$(grep "avg:" "$log_path" | awk '{print $2}' | head -1)
        min=$(grep "avg:" "$log_path" | awk '{print $5}' | head -1) 
        max=$(grep "avg:" "$log_path" | awk '{print $8}' | head -1)
        version=$(head -1 "$log_path" | awk '{print $5}')
        execution_time=$(grep "Performed" "$log_path" | awk '{print $5}' | head -1)
        startup_time=$(grep "Loading script.dat" "$log_path" | awk '{print $1}' | head -1)
        end_time=$(tail -1 "$log_path" | awk '{print $1}')

        # Calculate effective UPS (matching PowerShell formula)
        if [[ -n "$execution_time" && "$execution_time" != "0" ]]; then
            effective_ups=$(echo "scale=2; 1000 * $ticks / $execution_time" | bc -l)
        else
            effective_ups="0"
        fi

        # Output execution time (matching PowerShell output format)
        if [[ -n "$execution_time" ]]; then
            execution_seconds=$(echo "scale=3; $execution_time / 1000" | bc -l)
            echo "$execution_seconds seconds"
        else
            echo "Error parsing execution time"
        fi

        # Save results to CSV
        row_output="$save_name,$run,$startup_time,$end_time,$avg,$min,$max,$ticks,$execution_time,$effective_ups,$version,$platform,$notes"
        echo "$row_output" >> "$output_file"

        # Handle verbose results - output detailed tick data as CSV and open in editor
        if [[ "$verbose_result" == true ]]; then
            verbose_file="$output_folder/${sanitized_pattern}${output_name_verbose}_${run_name// /_}.csv"
            
            # Extract tick-by-tick data from log
            grep -E "(^tick,)|(^t[0-9]+,)" "$log_path" | sed 's/^t\([0-9]\+\)/\1/' > "$verbose_file"
            
            # Convert microseconds to milliseconds and make ticks 1-based (matching PowerShell logic)
            if [[ -s "$verbose_file" ]]; then
                # Process the CSV: convert timestamps and adjust tick numbering
                awk -F',' 'BEGIN{OFS=","} 
                NR==1 {print; next} 
                {
                    $1 = $1 + 1;  # Make ticks 1-based
                    for(i=2; i<=NF; i++) {
                        if($i ~ /^[0-9]+\.?[0-9]*$/) $i = $i / 1000000;  # Convert to milliseconds
                    }
                    print
                }' "$verbose_file" > "${verbose_file}.tmp" && mv "${verbose_file}.tmp" "$verbose_file"
                
                echo "Verbose results saved to: $verbose_file"
                
                # Open in editor (vim preferred, fallback to others)
                if command -v vim >/dev/null 2>&1; then
                    echo "Opening verbose results in vim..."
                    vim "$verbose_file" </dev/tty >/dev/tty 2>&1 &
                elif command -v nano >/dev/null 2>&1; then
                    echo "Opening verbose results in nano..."
                    nano "$verbose_file" </dev/tty >/dev/tty 2>&1 &
                elif command -v gedit >/dev/null 2>&1; then
                    echo "Opening verbose results in gedit..."
                    gedit "$verbose_file" >/dev/null 2>&1 &
                else
                    echo "No suitable editor found. View results with: cat $verbose_file"
                fi
            fi
        fi

        # Clean up log file if not keeping logs
        if [[ "$keep_logs" == false ]]; then
            rm "$log_path"
        fi
    done
done

echo ""
echo "Benchmarking complete! Results saved to: $output_file"