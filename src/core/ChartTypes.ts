export type NoteAction = "DON" | "KATSU";
export type NoteSize = "small" | "big";
export type NoteState = "waiting" | "active" | "finished";
export type NoteType = "tap" | "roll";

export type ChartNote =
  | {
      type: "tap";
      beat: number;
      action: NoteAction;
      size: NoteSize;
    }
  | {
      type: "roll";
      startBeat: number;
      endBeat: number;
      action: NoteAction;
      size: NoteSize;
    };

export interface Chart{
    bpm: number;
    offset: number;
    notes: ChartNote[];
}