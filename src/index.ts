#! /usr/bin/env node

import * as fs from "fs";
import meow from "meow";
import { parseText } from "./Parser";
import { createMidiFile } from "./Track";
import { Scale } from "./Scale";

const cli = meow(`
Usage
  $ musificate <input1> <input2> ...

If no input file is given, stdin is used.

Options
  --output, -o Output to File
  --scale, -s Use a different scale

Available Scales
  - dorian
  - default

Examples
  $ cat bob.txt | musificate > out.mid
  $ musificate aliceWonderland.txt -o out.mid
`,
{
  flags: {
    output: {
      type: "string",
      alias: "o"
    },
    scale: {
      type: "string",
      alias: "s"
    }
  }
});

const scales: { [scale: string]: Scale } = {
  dorian: s => s.charCodeAt(0),
  default: s => s.charCodeAt(0),
};

const { scale: cliScale } = cli.flags;

if (!!cliScale && !scales[cliScale]) {
  console.log(`Scale not found. Choose one of ${Object.keys(scales).join(", ")}.`);
  process.exit(1);
}

const scale = !!cliScale ? scales[cliScale] : scales.default;

const { input: cliInput } = cli;
const input = (() => {
  if (cliInput.length === 0) {
    return fs.readFileSync("/dev/stdin").toString();
  }
  const files = cliInput
                  .map(file => fs.readFileSync(file))
                  .map(b => b.toString());
  return files.join("\n");
})();

const { melody, bass } = parseText(scale)(input);
const midiFile = createMidiFile(melody, bass);

const { output } = cli.flags;

if (!!output) {
  fs.writeFileSync(output, midiFile, "binary");
} else {
  process.stdout.write(midiFile, "binary");
}
