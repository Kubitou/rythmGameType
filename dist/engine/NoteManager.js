"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteManager = void 0;
class NoteManager {
    spawnWindow;
    missWindow;
    upcomingNotes = [];
    activeNotes = [];
    constructor(spawnWindow, missWindow) {
        this.spawnWindow = spawnWindow;
        this.missWindow = missWindow;
    }
    load(notes) {
        this.upcomingNotes = [...notes].sort((a, b) => a.hitBeat - b.hitBeat);
    }
    update(currentBeat) {
        this.spawn(currentBeat);
        this.despawn(currentBeat);
    }
    spawn(currentBeat) {
        while (true) {
            const next = this.upcomingNotes[0];
            if (!next)
                break;
            if (next.hitBeat > currentBeat + this.spawnWindow)
                break;
            // console.log("spawn: ", next.hitBeat);
            this.activeNotes.push(this.upcomingNotes.shift());
        }
    }
    despawn(currentBeat) {
        while (true) {
            const note = this.activeNotes[0];
            if (!note)
                break;
            if (note.hitBeat + this.missWindow < currentBeat) {
                // console.log("despawn: ", note.hitBeat);
                this.activeNotes.shift();
            }
            else
                break;
        }
    }
    remove(note) {
        const index = this.activeNotes.indexOf(note);
        if (index !== -1) {
            this.activeNotes.splice(index, 1);
        }
    }
    getFirstActiveNote() {
        if (this.activeNotes.length === 0)
            return null;
        return this.activeNotes[0];
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