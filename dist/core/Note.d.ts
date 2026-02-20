import { NoteAction, NoteSize } from "./ChartTypes";
export declare class Note {
    readonly id: number;
    readonly hitBeat: number;
    readonly action: NoteAction;
    readonly size: NoteSize;
    private _judged;
    constructor(id: number, hitBeat: number, action: NoteAction, size: NoteSize);
    markJudged(): void;
    get judged(): boolean;
}
//# sourceMappingURL=Note.d.ts.map