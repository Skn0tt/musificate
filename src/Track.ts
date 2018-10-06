import * as Midi from "jsmidgen";
import { Note } from "./Note";

const createTrack = (notes: Note[]) => {
  const track = new Midi.Track();

  let currentPause = 0;
  notes.forEach(
    note => {
      if (note.pause) {
        currentPause += note.duration;
        return;
      }

      track.addNote(0, note.pitch, note.duration, currentPause);
      currentPause = 0;
    }
  );
  return track;
}

export const createMidiFile = (melody: Note[], bass: Note[]): string => {
  const file = new Midi.File();

  file.addTrack(createTrack(melody));
  file.addTrack(createTrack(bass));

  return file.toBytes();
}
