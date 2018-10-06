import { Note } from "./Note";

const parseToNote =
  (char: string, right: string): Note =>
    ({
      duration: right.charCodeAt(0),
      pitch: char.charCodeAt(0)
    });


const PAUSE_VALUES: { [char: string]: number } = {
  ".": 512,
  ":": 256,
  " ": 128,
  "!": 1024,
  "?": 1024
};

const PAUSE_CHARS = Object.keys(PAUSE_VALUES);

const parseToPause =
  (char: string): Note => ({
    pause: true,
    duration: PAUSE_VALUES[char] ||512
  });

const isPauseChar = (c: string) => PAUSE_CHARS.indexOf(c) !== -1;

const isUpperCase = (c: string) => c.toUpperCase() === c;

const isBassChar = isUpperCase

interface ParseResult {
  melody: Note[];
  bass: Note[];
}

export const parseText = (text: string) => {
  const result: ParseResult = { melody: [], bass: [] };

  let stagedBassNote: Note = { pause: true, duration: 0 }
  text.split("").forEach((char, index, arr) => {
    const nextChar = arr[index + 1];
    if (!nextChar) { return; }

    const isPause = isPauseChar(char);
    if (isPause) {
      // commit bass note
      if (!!stagedBassNote) {
        result.bass.push(stagedBassNote);
        stagedBassNote = { pause: true, duration: 0 };
      }

      // commit pause
      const pause = parseToPause(char);
      result.melody.push(pause);
      result.bass.push(pause);

      return;
    }

    const note = parseToNote(char, nextChar);
    
    // make current bassNote bigger
    stagedBassNote.duration += note.duration;

    // stage bass note
    const isBass = isBassChar(char);
    if (isBass) {
      stagedBassNote = note;
      return;
    }

    // commit melody note
    result.melody.push(note);
  });

  return result;
}