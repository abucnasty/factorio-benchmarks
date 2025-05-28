#The minimum powershell version required is v3. Use $PSVersionTable to read your currently installed version

#for how many ticks should each run of a map be ran
$ticks = 3600
#runs; number of times to benchmark each map
$runs = 5

[string]$pattern = "\.zip"
[string]$filename = "test_results"
[string]$platform = "WindowsStandalone"

[string[]]$maps = dir -n -file | select-string $pattern

#path to factorio.exe
Set-Alias -Name factorio.exe -Value "C:\Program Files (x86)\Steam\steamapps\common\Factorio\bin\x64\factorio.exe"

if ($maps.length -eq 0)
{
	echo "No maps were found with the specified pattern '$pattern'"
	pause
	exit
}

echo "map_name,run_index,startup_time,end_time,avg_ms,min_ms,max_ms,ticks,execution_time,effective_UPS,factorio_version,platform" >> test_results.csv

#runs are indexed such that they are interleaved when testing, so no map has any substantial advantage to going first or last
$i = 0
$k = 0
while ($i -lt $runs)
{
	
	for ($k = 0; $k -lt $maps.length; $k++)
	{
		#Load the factorio executable with the settings above in benchmark mode
		#Piping to out-null ensures that the process completes before the next command is executed.
		factorio.exe --benchmark $maps[$k] --benchmark-ticks $ticks --disable-audio > temp1 | out-null
		
		#perform a cleanup pass on the data, since depending on the time to benchmark a number of spaces will be added to the lines
		(cat temp1) -replace '\s+', ' ' > temp
		rm temp1
		
		$map_name = $maps[$k]
		$avg_ms = ((cat temp | Select-String "avg:") -split " ")[2]
		$min_ms = ((cat temp | Select-String "avg:") -split " ")[5]
		$max_ms = ((cat temp | Select-String "avg:") -split " ")[8]
		$factorio_version = ((cat temp -First 1) -split " ")[5]
		$execution_time = ((cat temp | Select-String "Performed") -split " ")[5]
		$startup_time = ((cat temp | Select-String "Loading script.dat") -split " ")[1]
		$end_time = ((cat temp -last 1) -split " ")[1]
		$effective_UPS  = [math]::Round((1000 * $ticks / $execution_time), 2)
		$run_index = $i + 1
		
		echo "$map_name,$run_index,$startup_time,$end_time,$avg_ms,$min_ms,$max_ms,$ticks,$execution_time,$effective_UPS,$factorio_version,$platform" >> test_results.csv
	}
	
	$i++;
	rm temp
}