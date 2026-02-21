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
    tryHit(currentBeat, action) {
        const note = this.noteManager.getFirstActiveNote();
        if (!note)
            return null;
        if (note.action !== action)
            return null;
        const delta = currentBeat - note.hitBeat;
        // console.log("DELTA:", delta);
        if (delta < -this.badWindow)
            return null;
        const abs = Math.abs(delta);
        if (abs <= this.perfectWindow) {
            note.markJudged();
            this.noteManager.remove(note);
            return "perfect";
        }
        if (abs <= this.goodWindow) {
            note.markJudged();
            this.noteManager.remove(note);
            return "good";
        }
        if (abs <= this.badWindow) {
            note.markJudged();
            this.noteManager.remove(note);
            return "bad";
        }
        return null;
    }
}
exports.Judge = Judge;
//# sourceMappingURL=Judge.js.map