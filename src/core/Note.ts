import { NoteAction, NoteSize } from "./ChartTypes";

export class Note{
    readonly id: number
    readonly hitTime: number
    readonly action: NoteAction
    readonly size: NoteSize

    private _judged = false;

    constructor(id: number, hitTime: number, action: NoteAction, size: NoteSize){
        this.id = id;
        this.hitTime = hitTime;
        this.action = action;
        this.size = size;
    }

    markJudged(){
        this._judged = true;
    }

    get judged(): boolean {
        return this._judged;
    }
}