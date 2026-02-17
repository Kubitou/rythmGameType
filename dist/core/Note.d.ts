import { NoteAction, NoteSize } from "./ChartTypes";
export declare class Note {
    readonly id: number;
    readonly hitTime: number;
    readonly action: NoteAction;
    readonly size: NoteSize;
    private _judged;
    constructor(id: number, hitTime: number, action: NoteAction, size: NoteSize);
    markJudged(): void;
    get judged(): boolean;
}
//# sourceMappingURL=Note.d.ts.map