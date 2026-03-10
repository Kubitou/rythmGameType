import { NoteAction, NoteSize, NoteState, RollHitResult } from "./ChartTypes";

export abstract class Note{
    readonly id: number
    readonly action: NoteAction
    readonly size: NoteSize

    constructor(id: number, action: NoteAction, size: NoteSize){
        this.id = id;
        this.action = action;
        this.size = size;
    }
    
    abstract get startBeat(): number;
}

export class TapNote extends Note{
    constructor(
        readonly hitBeat: number, 
        id: number, 
        action: NoteAction, 
        size: NoteSize
    ){
        super(id, action, size);
    }

    get startBeat(): number{
        return this.hitBeat;
    }

    private _judged = false;

    markJudged(){
        this._judged = true;
    }

    get judged(): boolean {
        return this._judged;
    }
}

export class RollNote extends Note{
    constructor(
        readonly startBeat: number, 
        readonly endBeat: number, 
        id: number, 
        action: NoteAction, 
        size: NoteSize
    ){
        super(id, action, size);
    }

    private hitCount: number = 0;

    private state: NoteState = "waiting"


    updateRoll(currentBeat: number){
        if(this.state === "finished") return;
        
        if(currentBeat >= this.startBeat && currentBeat <= this.endBeat){
            this.state = "active";
            return;
        }

        if(currentBeat > this.endBeat){
            this.state = "finished"
        }

    }

    tryHit(action: NoteAction): RollHitResult | null{
        if(this.state !== "active") return null;
        if(action !== this.action) return null;

        this.hitCount++;
        return "roll-hit";
    }

    get numberOfHits(){
        return this.hitCount;
    }

    get rollState(){
        return this.state;
    }

    get isActive(){
        return this.state === "active";
    }

    get isFinished(){
        return this.state === "finished";
    }

}