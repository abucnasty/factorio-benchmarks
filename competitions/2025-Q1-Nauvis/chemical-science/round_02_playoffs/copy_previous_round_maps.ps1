cd ..

mkdir temp_maps

$src = ".\maps"
$dst = ".\temp_maps"



Get-ChildItem -Path $src -File -Filter "design_*" |
    Where-Object { $_.Name -match '^design_(00|01|05|06|08|09|11|12|13|14|18|22|23|26|27|28|29|30|32|34|35)' } |
    Copy-Item -Destination $dst

cd round_02_playoffs