#!/bin/bash

# Directory containing the results folders
BASE_DIR="$(dirname "$0")"
AGG_DIR="$BASE_DIR/results_agg"

# Create aggregate directory if it doesn't exist
mkdir -p "$AGG_DIR"

# Loop through each results_* subdirectory
for dir in "$BASE_DIR"/results_*/; do
    # Extract folder name (e.g., results_linux_standalone)
    folder_name=$(basename "$dir")

    if [ "$folder_name" == "results_linux_standalone_mimalloc_multi_run" ]; then
        continue  # skip multi runs
    fi
    if [ "$folder_name" == "results_windows_vanilla_multi_run" ]; then
        continue  # skip multi runs
    fi
    
    # Source file
    src_file="$dir/dmb_main_research_prod_verbose_metrics.csv"
    
    # Check if the source file exists
    if [ -f "$src_file" ]; then
        # Create new filename by injecting folder name
        # e.g., dmb_main_research_prod_verbose_metrics.csv -> dmb_main_research_prod_linux_standalone_verbose_metrics.csv
        suffix="${folder_name#results_}"  # Remove 'results_' prefix
        dest_file="$AGG_DIR/dmb_main_research_prod_${suffix}_verbose_metrics.csv"
        
        echo "Copying: $src_file -> $dest_file"
        cp "$src_file" "$dest_file"
    else
        echo "Warning: $src_file not found, skipping..."
    fi
done

echo "Done!"
