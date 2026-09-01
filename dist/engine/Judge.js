export class Judge {
    constructor(noteManager, perfectWindow, goodWindow, badWindow) {
        this.noteManager = noteManager;
        this.perfectWindow = perfectWindow;
        this.goodWindow = goodWindow;
        this.badWindow = badWindow;
        this.lastInputBeat = -Infinity;
        this.inputCooldown = 0.05;
        this.lastNoteId = 0;
    }
    tryHit(currentBeat, action) {
        const EPSILON = 0.000001;
        const note = this.noteManager.findClosestTap(currentBeat, action, this.badWindow);
        if (!note)
            return null;
        if (note.action !== action)
            return null;
        if (currentBeat - this.lastInputBeat < this.inputCooldown)
            return null;
        // console.log("JUDGING NOTE:", note.id, note.startBeat);
        this.lastInputBeat = currentBeat;
        const delta = currentBeat - note.hitBeat;
        if (delta < -this.badWindow)
            return null;
        const abs = Math.abs(delta);
        console.log("delta:", delta, "abs:", abs);
        if (abs <= this.perfectWindow + EPSILON) {
            note.markJudged();
            this.lastNoteId = note.id;
            this.noteManager.remove(note);
            return "perfect";
        }
        if (abs <= this.goodWindow + EPSILON) {
            note.markJudged();
            this.lastNoteId = note.id;
            this.noteManager.remove(note);
            return "good";
        }
        if (abs <= this.badWindow + EPSILON) {
            note.markJudged();
            this.lastNoteId = note.id;
            this.noteManager.remove(note);
            return "bad";
        }
        note.markJudged();
        this.lastNoteId = note.id;
        this.noteManager.remove(note);
        return "miss";
    }
    resetJudge() {
        this.lastInputBeat = -Infinity;
        this.lastNoteId = 0;
    }
    get lastHitNoteId() {
        return this.lastNoteId;
    }
}
//# sourceMappingURL=Judge.js.map