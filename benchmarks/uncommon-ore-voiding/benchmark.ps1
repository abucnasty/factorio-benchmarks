param (
    # number of ticks to run per save file
    [int]$ticks = 900,
    # number of runs
    [int]$runs = 3,
    # Defaults to all files ending with .zip
    [string]$filePattern = "\.zip",
    # Output of verbose statistics
    [switch]$verboseResult = $false
)
$repoRoot = (Get-Item -Path $PSScriptRoot).Parent.Parent.FullName
$benchmarkScriptPath = Join-Path -Path $repoRoot -ChildPath "scripts\benchmark.ps1"
$modPath = Join-Path -Path $PSScriptRoot -ChildPath "\benchmark-mods"
$modPathUnix = ($modPath -replace "\\","/").ToLower().Trim("/")

$argumentString = "$ticks $runs `"$filePattern`" -enableMods -benchmarkModFolder `"$modPathUnix`""

if ($verboseResult) {
    $argumentString += " -verboseResult"
} else {
    $argumentString += " -forceCSV"
}

Start-Process -FilePath "powershell.exe" `
    -ArgumentList "-ExecutionPolicy Bypass -File `"$benchmarkScriptPath`" $argumentString" `
    -WorkingDirectory (Get-Location) `
    -NoNewWindow -Wait