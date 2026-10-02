factorio_path="$HOME/.local/bin/factorio-beta-mimalloc"
factorio_data_path="$HOME/Games/factorio_beta/script-output/belt" 
maps_dir="../../../maps"

belt sanitize "$maps_dir" \
    --factorio-path "$factorio_path" \
    --pattern "utility_science_*" \
    --ticks 36000 \
    --items "utility-science-pack" \
    --fluids "" \
    --mods-dir "$HOME/Games/factorio_beta/mods" \
    --data-dir "$factorio_data_path" \
    --verbose \
    2>&1 | tee output.log