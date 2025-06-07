## Template Benchmark
- put all save files in this folder
- default finds all files ending with `.zip`


### Config Options

In the `./benchmark.ps1` script, modify the following based on test runs:
- `ticks` = number of ticks to run this simulation
- `runs` = number of runs per save file
- `filePattern` = default is `\.zip` but can be anything
  - For example `foo` will match all files that start with `foo`
- `verboseResult` = default false, specifies if you want the output per verbose logging for graphing purposes


### Running Mods
List all mods in the `./benchmark-mods/mod-list.json` that you use for your save files. For example, if you use `EditorExtensions` then add it to the `mods` array like so:
```json
{
  "mods": [
    {
      "name": "EditorExtensions",
      "enabled": true
    },
  ]
}
```