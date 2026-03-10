export type NoteAction = "DON" | "KATSU";
export type NoteSize = "small" | "big";
export type NoteState = "waiting" | "active" | "finished";
export type NoteType = "tap" | "roll";
export type RollHitResult = "roll-hit" ;

export type ChartNote =
  | {
      beat: number;
      action: NoteAction;
      size: NoteSize;
      type?: "tap";
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