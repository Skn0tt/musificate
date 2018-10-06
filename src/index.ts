import * as fs from "fs";
import { parseText } from "./Parser";
import { createMidiFile } from "./Track";

const stdin = fs.readFileSync("/dev/stdin").toString();

const { melody, bass } = parseText(stdin);

const midiFile = createMidiFile(melody, bass);

process.stdout.write(midiFile, "binary");