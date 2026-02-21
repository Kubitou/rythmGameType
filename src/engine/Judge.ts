import { Note } from "../core/Note";
import { NoteManager } from "./NoteManager";
import { TimeEngine } from "./TimeEngine";

type Judgment = "perfect" | "good" | "bad" | null;

export class Judge{
    constructor(
        private noteManager: NoteManager,
        private perfectWindow: number,
        private goodWindow: number,
        private badWindow: number
    ){}

    tryHit(currentBeat: number, action: string): Judgment{
        const note = this.noteManager.getFirstActiveNote();
        if(!note) return null;

        if(note.action !== action) return null;

        const delta = currentBeat - note.hitBeat;

        // console.log("DELTA:", delta);

        if(delta < -this.badWindow) return null;

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

        return null;
    }
}