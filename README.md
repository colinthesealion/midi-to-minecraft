# midi-to-minecraft

Convert a `.midi` file into a series of note blocks.

## Requirements
[fabric-carpet](https://github.com/gnembon/fabric-carpet) >= 1.4.22

## Usage

The first stage is a node script that converts a `.midi` file into a JSON-encoded list of note blocks:
```bash
Usage: index.js [options]

Options:
      --version  Show version number                                   [boolean]
  -i, --input    input midi file path                                 [required]
  -o, --output   output json file path                                [required]
  -h, --help     Show help                                             [boolean]
```

The second stage uses [scarpet](https://github.com/gnembon/scarpet) to place a series of blocks in your world to execute the series of note blocks as a redstone contraption. To complete this stage, you will need to [install](https://github.com/gnembon/fabric-carpet/wiki/Installing-carpet-scripts-in-your-world) the `scripts/build_song.sc` scarpet app in your world. You will also need to move the JSON file into `.minecraft/config/carpet/scripts/shared/`.

Once the script is installed, in your minecraft world, with OP:
```
\script load build_song
\script invokepoint ~ ~ ~ [filename] [y-offset]
```
Where `filename` is the name of the JSON file without the `.json` extension and `y-offset` is how far from the player vertically you would like to build the contraption (negative values for beneath the player are typical).

## Known Issues
* Midi files can have up to 16 simultaneous sounds; currently only 2 of them will play at once
* The shape of the redstone contraption should be more or less a sphere, but currently the starting point is not accurately calculated
* The repeat mode lever does not work without adding some redstone wire between the end and the start of the song
