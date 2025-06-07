<#
.SYNOPSIS
    A Factorio Benchmark Powershell Script
.DESCRIPTION
    Author: Tapani Kiiskinen
    Version: v1.2.0
    Depends on Import-Excel https://github.com/dfinke/ImportExcel for -verboseOutput and nicer normal output
.EXAMPLE

    .\benchmark.ps1

    cmdlet benchmark.ps1 at command pipeline position 1
    Supply values for the following parameters:
    (Type !? for Help.)
    ticks: 6000
    runs: 1

    Following saves found in 'C:\Users\user\AppData\Roaming\Factorio\saves':

    steam_autocloud
    _autosave1
    _autosave2
    Beacon Benchmark
    Belt Benchmark
    Inserter Benchmark

    Executing benchmark after confirmation. Ctrl-c to cancel. Press Enter to continue...:


.EXAMPLE

    .\benchmark.ps1 6000 10 "Benchmark"

    Following saves found matching pattern 'Beacon Benchmark':

    Beacon Benchmark
    Belt Benchmark
    Inserter Benchmark

    Executing benchmark after confirmation. Ctrl-c to cancel. Press Enter to continue...:

.LINK
    https://github.com/velit/Factorio-Benchmark-Powershell
#>
param (

    ##################
    # BASIC SETTINGS #
    ##################

    # Specify the amount of ticks of simulation for each benchmark savefile run
    [Parameter(Mandatory,HelpMessage="Specify the amount of ticks of simulation for each benchmark savefile run")]
    [int]$ticks,

    # Specify the amount of times to repeat each benchmark savefile
    [Parameter(Mandatory,HelpMessage="Specify the amount of times to repeat each benchmark savefile")]
    [int]$runs,

    # Benchmark filenames can be filtered using this pattern
    # Defaults to all savefiles found in -savepath
    #
    # This setting can also be used as a prefix to the result files
    # See -usePatternAsOutputPrefix
    [string]$pattern = "",

    # Factorio config path
    # Defaults to $env:APPDATA\Factorio\ (Default Factorio config folder)
    [string]$configpath = "$env:APPDATA\Factorio\",

    # Factorio save path
    # Savefiles are collected recursively from this path
    # Defaults to $env:APPDATA\Factorio\saves (Default Factorio save folder)
    [string]$savepath = $PSScriptRoot,

    # Factorio executable path
    # Defaults to ${env:ProgramFiles(x86)}\Steam\steamapps\common\Factorio\bin\x64\factorio.exe (Default Steam installation folder)
    [string]$executable = "${env:ProgramFiles(x86)}\Steam\steamapps\common\Factorio\bin\x64\factorio.exe",
    # [string]$executable = "$env:userprofile\Games\Steam\steamapps\common\Factorio\bin\x64\factorio.exe",

    # Logging string that is used in the regular output file
    # Defaults to WindowsSteam
    # This is just for convention/convenience and is not used in any logic
    [string]$platform = "WindowsSteam",

    # Logging string that is used in the regular output file
    # Add whatever notes you would like to be included for the given runs
    # This is just for convention/convenience and is not used in any logic
    [string]$notes = "",



    #####################
    # ADVANCED SETTINGS #
    #####################

    # Base output filename (csv/xlsx)
    # Default is results
    [string]$outputName = "test_results",

    # Base verbose output filename (always xlsx)
    # Default is verbose
    [string]$outputNameVerbose = "Verbose Results",

    # Output results folder
    [string]$outputFolder = ".\",

    # Script will default to using xlsx output if Export-Excel dependency is
    # installed. You may force the non-verbose output file to always be CSV with
    # this if you so wish.
    #
    # Note: Usage of Excel specifically is not mandatory even with .xlsx files.
    # Spreadsheet software just tend to import the data better in more rigid
    # file formats than .csv which has issues with localization for example with
    # decimal separators.
    [switch]$forceCSV = $false,

    # Add -pattern string to output files as prefix.
    # Useful if you don't want all your results ending up in the same files.
    [switch]$usePatternAsOutputPrefix = $false,

    # If given preserve the raw logs produced by factorio.exe
    [switch]$keepLogs = $false,

    # If given and -output file exists clear it before running
    [switch]$clearOutputFile = $false,

    # If given use user's normal mods
    # By default a separate mod folder is used
    # This separate mod folder can be specified with -benchmarkModFolder
    [switch]$enableMods = $false,

    # If -enableMods isn't given use this folder as the target for benchmarking mods
    # Defaults to ./benchmark-mods/
    # Note factorio expects this path in unix format with forward slashes for separators
    [string]$benchmarkModFolder = "./benchmark-mods/",

    # If given enables verbose mode which logs per-tick benchmarks and outputs
    # an xlsx file
    [switch]$verboseResult = $false,

    # Specify the list of items included in verbose -verboseResult output. Valid items are:
    #
    # tick,timestamp,wholeUpdate,latencyUpdate,gameUpdate,circuitNetworkUpdate,transportLinesUpdate,fluidsUpdate,heatManagerUpdate,entityUpdate,particleUpdate,mapGenerator,mapGeneratorBasicTilesSupportCompute,mapGeneratorBasicTilesSupportApply,mapGeneratorCorrectedTilesPrepare,mapGeneratorCorrectedTilesCompute,mapGeneratorCorrectedTilesApply,mapGeneratorVariations,mapGeneratorEntitiesPrepare,mapGeneratorEntitiesCompute,mapGeneratorEntitiesApply,crcComputation,electricNetworkUpdate,logisticManagerUpdate,constructionManagerUpdate,pathFinder,trains,trainPathFinder,commander,chartRefresh,luaGarbageIncremental,chartUpdate,scriptUpdate,
    #
    # tick must be one of the selected items, otherwise the script won't work
    [string]$verboseItems = "tick,wholeUpdate,wholeUpdate,gameUpdate,circuitNetworkUpdate,transportLinesUpdate,fluidsUpdate,entityUpdate,electricNetworkUpdate,logisticManagerUpdate,trains,trainPathFinder",

    # Specify which CPU priority to use. Valid values are:
    #
    # Idle, BelowNormal, Normal, AboveNormal, High, or RealTime
    #
    # Defaults to High
    [string]$cpuPriority = "High",

    # Specify CPU affinity. Valid values between 0 - 255
    #
    # Sum the numbers associated with the cores to specify the cores you want factorio to run in.
    # Core 1 = 1
    # Core 2 = 2
    # Core 3 = 4
    # Core 4 = 8
    # Core 5 = 16
    # Core 6 = 32
    # Core 7 = 64
    # Core 8 = 128
    # Eg. enabling core 1, 3 and 5 is 1 + 4 + 16 = 21
    #
    # Defaults to 0 which disables affinity specification altogether
    [int]$cpuAffinity = 0
)
#End of user variables

$ErrorActionPreference = "Stop"

$xlsxEnabled = $false
if (Get-Command Export-Excel -errorAction SilentlyContinue)
{
  $xlsxEnabled = $true
}
elseif ($verboseResult) {
  Write-Host -NoNewLine "UNMET DEPENDENCY.

Export-Excel cmdlet not found for verbose mode and nicer normal output.
Script will continue normally but verbose results file won't be generated.
Please install the dependency by running this command in powershell:

    Install-Module ImportExcel -scope CurrentUser

Ctrl-c to cancel. "
  pause
}

# Collect the saves to benchmark
Write-Output ""
if ($pattern -ne "") {
  [array]$saves = dir $savepath -file -recurse | where {$_.FullName -Match $pattern}
  $saveFoundMessage = "found matching pattern '$pattern'"
}
else {
  [array]$saves = dir $savepath -file -recurse
  $saveFoundMessage = "found in '$savepath'"
}

if ($saves.length -ne 0) {
  Write-Output "Following saves ${saveFoundMessage}:"
}
else {
  Write-Output "No saves $saveFoundMessage."
  Write-Output ""
  exit
}

Write-Output ""
Write-Output $($saves | select -ExpandProperty BaseName)
Write-Output ""
Write-Host -NoNewLine "Executing benchmark after confirmation. Ctrl-c to cancel. "
pause


[System.IO.FileInfo]$lockPath = Join-Path $configpath -ChildPath (".lock")
if (Test-Path $lockPath) {
  Write-Output ""
  Write-Output "WARNING: Factorio is currently running:"
  Write-Output "`t$lockPath exists"
  Write-Output ""
  Write-Output "Script will crash if Factorio is still running when continuing."
  Write-Output ""
  Write-Host -NoNewLine "Ctrl-c to cancel. "
  pause
}

$sanitized_pattern = ""
if ($usePatternAsOutputPrefix) {
  # Remove illegal filename characters from pattern for output filename
  $sanitized_pattern = ($pattern.Split([IO.Path]::GetInvalidFileNameChars()) -join '_') + " "
}
if (($xlsxEnabled) -and -not ($forceCSV)) {
  [System.IO.FileInfo]$output = Join-Path $outputFolder -ChildPath ($sanitized_pattern + $outputName + ".xlsx")
}
else {
  [System.IO.FileInfo]$output = Join-Path $outputFolder -ChildPath ($sanitized_pattern + $outputName + ".csv")
}
[System.IO.FileInfo]$outputVerbose = Join-Path $outputFolder -ChildPath ($sanitized_pattern + $outputNameVerbose + ".xlsx")

# Delete output file if feature is enabled
if ($clearOutputFile) {
  if (Test-Path $output) {
    rm $output
  }
  if (Test-Path $outputVerbose) {
    rm $outputVerbose
  }
}

$csvDelimiter = ','
$headers = (("Save", "Run", "Startup time", "End time", "Avg ms", "Min ms", "Max ms", "Ticks", "Execution Time ms", "Effective UPS", "Version", "Platform", "Notes") -join "$csvDelimiter")
# Check if output file already exists
if (-not (Test-Path $output)) {
  # Create folders for output file
  [Void](New-Item -Force (Split-Path -Path $output) -ItemType Directory)

  # Create output and print headers
  if (-not ($xlsxEnabled) -or ($forceCSV)) {
    Write-Output $headers > $output
  }
  else {
  }
}

Write-Output ""
# Main benchmark loop
for ($i = 0; $i -lt $runs; $i++) {
  for ($j = 0; $j -lt $saves.length; $j++) {
    $run = $i + 1
    $save = $saves[$j].FullName
    $saveName = $saves[$j].BaseName
    $runName = $saveName + " Run " + $run
    $runNameShort = $saveName + " R" + $run
    $logPath = Join-Path $outputFolder ($runName + ".log")

    Write-Host -NoNewline "Benchmarking $runName`t"

    # Run factorio
    $argList = "--benchmark `"$save`" --benchmark-ticks $ticks --disable-audio"
    
    if ($verboseResult) {
      $argList += " --benchmark-verbose " + $verboseItems
    }
    
    if (-not $enableMods) {
      $argList += " --mod-directory `"$benchmarkModFolder`""
    }

    $process = Start-Process -PassThru -FilePath $executable -ArgumentList $argList -RedirectStandardOutput $logPath

    # Set process flags and wait for execution to finish
    $process.PriorityClass = $cpuPriority
    if ($cpuAffinity -ne 0) {
      $process.ProcessorAffinity = $cpuAffinity
    }
    $process.WaitForExit()

    # Perform a cleanup pass on the data, since depending on the time to benchmark a number of spaces will be added to
    # the lines
    $logData = (Get-Content $logPath) -replace '^\s+', ''
    $logData | Set-Content $logPath

    # Parse data
    $avg = (($logData | Select-String "avg:") -split " ")[1]
    $min = (($logData | Select-String "avg:") -split " ")[4]
    $max = (($logData | Select-String "avg:") -split " ")[7]
    $version = (($logData | Select-Object -First 1) -split " ")[4]
    $executionTime = (($logData | Select-String "Performed") -split " ")[4]
    $startupTime = (($logData | Select-String "Loading script.dat") -split " ")[0]
    $endTime = (($logData | Select-Object -Last 1) -split " ")[0]
    $effectiveUPS  = [math]::Round((1000 * $ticks / $executionTime), 2)

    # Save the results
    Write-Output "$($executionTime / 1000) seconds"
    $rowOutput = (($saveName, $run, $startupTime, $endTime, $avg, $min, $max, $ticks, $executionTime, $effectiveUPS, $version, $platform, $notes) -join "$csvDelimiter")

    if (($xlsxEnabled) -and -not ($forceCSV)) {
      ($headers, $rowOutput) | ConvertFrom-Csv -Delimiter "$csvDelimiter" | Export-Excel -KillExcel -Append -AutoSize $output 
    }
    else {
      Write-Output $rowOutput >> $output
    }

    # If verbose result is enabled produce a separarte xlsx file with verbose results
    if (($verboseResult) -and ($xlsxEnabled)) {
      $time = Get-Date -Format "HHmm "

      # Select run-specific lines
      # remove 't' from tick number
      $verboseData = $logData `
        | Select-String -Pattern "(^tick,)|(^t\d+)," `
        | ForEach-Object {$_ -Replace "^t(\d+)", '$1'} `
        | ConvertFrom-Csv `

      # Change to milliseconds and make ticks 1-based
      $verboseData | ForEach-Object { 
        foreach ($property in $_.PSObject.Properties) {
          if ($property.Name -eq "tick") {
            [int]$property.Value += 1
          }
          else {
            $property.Value = $property.Value / 1000000
          }
        }
      }

      # Output xlsx file
      $verboseData | Export-Excel -KillExcel -AutoSize -WorksheetName ($time + $runNameShort) $outputVerbose
    }

    if (-not ($keepLogs)) {
      rm "$logPath"
    }
  }
}