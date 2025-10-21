belt sanitize maps `
    --pattern "[0-9]*" `
    --ticks 216000 `
    --items "production-science-pack,stone,coal" `
    --fluids "crude-oil,molten-iron,molten-copper" `
    --mods-dir "C:\Users\abucz\AppData\Roaming\Factorio\mods" `
    | Out-File -FilePath 60_minutes_continuous.txt