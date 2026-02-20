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
            this.activeNotes.push(this.upcomingNotes.shift());
            console.log("Spawn:", next.hitBeat);
        }
    }
    despawn(currentBeat) {
        while (true) {
            const note = this.activeNotes[0];
            if (!note)
                break;
            if (note.hitBeat + this.missWindow < currentBeat) {
                console.log("Miss:", note.hitBeat);
                this.activeNotes.shift();
            }
            else
                break;
        }
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