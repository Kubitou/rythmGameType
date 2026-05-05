"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Judge = void 0;
class Judge {
    noteManager;
    perfectWindow;
    goodWindow;
    badWindow;
    constructor(noteManager, perfectWindow, goodWindow, badWindow) {
        this.noteManager = noteManager;
        this.perfectWindow = perfectWindow;
        this.goodWindow = goodWindow;
        this.badWindow = badWindow;
    }
    lastInputBeat = -Infinity;
    inputCooldown = 0.05;
    lastNoteId = 0;
    tryHit(currentBeat, action) {
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
        if (abs <= this.perfectWindow) {
            note.markJudged();
            this.lastNoteId = note.id;
            this.noteManager.remove(note);
            return "perfect";
        }
        if (abs <= this.goodWindow) {
            note.markJudged();
            this.lastNoteId = note.id;
            this.noteManager.remove(note);
            return "good";
        }
        if (abs <= this.badWindow) {
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
    get lastHitNoteId() {
        return this.lastNoteId;
    }
}
exports.Judge = Judge;
//# sourceMappingURL=Judge.js.map