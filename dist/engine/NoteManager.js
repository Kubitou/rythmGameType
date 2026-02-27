"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteManager = void 0;
class NoteManager {
    spawnWindow;
    missWindow;
    upcomingNotes = [];
    activeNotes = [];
    expiredNotes = [];
    constructor(spawnWindow, missWindow) {
        this.spawnWindow = spawnWindow;
        this.missWindow = missWindow;
    }
    load(notes) {
        this.upcomingNotes = [...notes].sort((a, b) => a.startBeat - b.startBeat);
    }
    update(currentBeat) {
        this.spawn(currentBeat);
        this.collectExpiredNotes(currentBeat);
    }
    spawn(currentBeat) {
        while (true) {
            const next = this.upcomingNotes[0];
            if (!next)
                break;
            if (next.startBeat > currentBeat + this.spawnWindow)
                break;
            // console.log("spawn: ", next.hitBeat);
            this.activeNotes.push(this.upcomingNotes.shift());
        }
    }
    collectExpiredNotes(currentBeat) {
        while (true) {
            const note = this.activeNotes[0];
            if (!note)
                break;
            if ("hitBeat" in note) {
                if (note.startBeat + this.missWindow < currentBeat) {
                    this.expiredNotes.push(this.activeNotes.shift());
                    continue;
                }
            }
            break;
        }
    }
    drainExpired() {
        const notes = [...this.expiredNotes];
        this.expiredNotes = [];
        return notes;
    }
    remove(note) {
        const index = this.activeNotes.indexOf(note);
        if (index !== -1) {
            this.activeNotes.splice(index, 1);
        }
    }
    getFirstActiveNote() {
        return this.activeNotes.at(0) ?? null;
    }
    get getActiveNotes() {
        return this.activeNotes;
    }
    get getUpcomingNotes() {
        return this.upcomingNotes;
    }
}
exports.NoteManager = NoteManager;
//# sourceMappingURL=NoteManager.js.map