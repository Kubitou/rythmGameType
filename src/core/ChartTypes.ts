export type NoteAction = "DON" | "KATSU";
export type NoteSize = "small" | "big";

export interface ChartNote{
    beat: number;
    action: NoteAction;
    size: NoteSize;
}

export interface Chart{
    bpm: number;
    offset: number;
    notes: ChartNote[];
}