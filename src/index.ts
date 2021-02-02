import { read } from 'midifile-ts';
import fs from 'fs';
import yargs from 'yargs/yargs';
import path from 'path';

import getBlockPallette from './instrument-blocks';
import generateBlockSequences from './generate-block-sequence';


const { argv } = yargs(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .alias('i', 'input')
    .nargs('i', 1)
    .describe('i', 'input midi file path')
    .demandOption('i')
    .alias('o', 'output')
    .nargs('o', 1)
    .describe('o', 'output json file path')
    .demandOption('o')
    .help('h')
    .alias('h', 'help');

const data = fs.readFileSync(argv.input as string);
const midi = read(data);

const blockPallette = getBlockPallette(midi);
const blockSequences = generateBlockSequences(midi, blockPallette);
if (blockSequences.length === 0) {
    console.error(`No tracks found in ${argv.input}`);
    process.exit(1);
}
else if (blockSequences.length === 1) {
    fs.writeFileSync(argv.output as string, JSON.stringify(blockSequences[0], undefined, 2));
    console.log(`Note block sequence written to ${argv.output}`);
}
else {
    const { dir, name, ext } = path.parse(argv.output as string);
    blockSequences.forEach((blockSequence, i) => {
        const filename = path.join(
            dir,
            `${name}.${i}${ext}`
        );
        fs.writeFileSync(filename, JSON.stringify(blockSequence, undefined, 2));
        console.log(`Note blopck sequence for track ${i + 1} written to ${filename}`);
    });
}
