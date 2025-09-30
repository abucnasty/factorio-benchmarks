cd ..

mkdir temp_maps

$src = ".\maps"
$dst = ".\temp_maps"



Get-ChildItem -Path $src -File -Filter "design_*" |
    Where-Object { $_.Name -match '^design_(00|01|27|28|35|08|12|14|18)' } |
    Copy-Item -Destination $dst

cd round_03_playoffs