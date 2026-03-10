import { TapNote } from "../core/Note";
import { NoteManager } from "./NoteManager";
import { TimeEngine } from "./TimeEngine";

type Judgment = "perfect" | "good" | "bad" | "miss";

export class Judge{
    constructor(
        private noteManager: NoteManager,
        private perfectWindow: number,
        private goodWindow: number,
        private badWindow: number
    ){}

    private lastInputBeat = -Infinity
    private inputCooldown = 0.05;

    tryHit(currentBeat: number, action: string): Judgment{
        const note = this.noteManager.getFirstActiveNote();
        if(!note) return "miss";

        if(!(note instanceof TapNote)) return "miss";

        if(note.action !== action) return "miss";

        if(currentBeat - this.lastInputBeat < this.inputCooldown) return "miss";
        this.lastInputBeat = currentBeat;

        const delta = currentBeat - note.hitBeat;

        // console.log("DELTA:", delta);

        if(delta < -this.badWindow) return "miss";

        const abs = Math.abs(delta);

        if(abs <= this.perfectWindow){
            note.markJudged();
            this.noteManager.remove(note);
            return "perfect";
        }

        if(abs<= this.goodWindow){
            note.markJudged();
            this.noteManager.remove(note);
            return "good";
        }

        if(abs <= this.badWindow){
            note.markJudged();
            this.noteManager.remove(note);
            return "bad";
        }

        note.markJudged();
        this.noteManager.remove(note);
        return "miss";
    }

    miss(note: TapNote): "miss"{
        note.markJudged();
        this.noteManager.remove(note);
        return "miss";
    }
}