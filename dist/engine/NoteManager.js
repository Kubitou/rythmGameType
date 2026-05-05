import { RollNote, TapNote } from "../core/Note.js";
export class NoteManager {
    constructor(spawnWindow, missWindow) {
        this.spawnWindow = spawnWindow;
        this.missWindow = missWindow;
        this.upcomingNotes = [];
        this.activeNotes = [];
        this.expiredNotes = [];
        this.activeRoll = null;
    }
    load(notes) {
        this.upcomingNotes = [...notes].sort((a, b) => a.startBeat - b.startBeat);
    }
    update(currentBeat) {
        this.spawn(currentBeat);
        this.collectExpiredNotes(currentBeat);
        if (this.activeRoll && this.activeRoll.isFinished) {
            this.activeRoll = null;
        }
    }
    spawn(currentBeat) {
        while (true) {
            const next = this.upcomingNotes[0];
            if (!next)
                break;
            if (next.startBeat > currentBeat + this.spawnWindow)
                break;
            const spawned = this.upcomingNotes.shift();
            this.activeNotes.push(spawned);
            if (spawned instanceof RollNote) {
                this.activeRoll = spawned;
            }
        }
    }
    collectExpiredNotes(currentBeat) {
        for (let i = 0; i < this.activeNotes.length;) {
            const note = this.activeNotes[i];
            if (!note)
                break;
            if (note.getExpireBeat() + this.missWindow < currentBeat) {
                this.expiredNotes.push(note);
                this.activeNotes.splice(i, 1);
                continue;
            }
            i++;
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
        if (note === this.activeRoll) {
            this.activeRoll = null;
        }
    }
    getActiveRoll() {
        if (!this.activeRoll)
            return null;
        if (this.activeRoll.isFinished)
            return null;
        return this.activeRoll;
    }
    getFirstActiveNote() {
        var _a;
        return (_a = this.activeNotes.at(0)) !== null && _a !== void 0 ? _a : null;
    }
    findClosestTap(currentBeat, action, window) {
        for (const note of this.activeNotes) {
            if (!(note instanceof TapNote))
                continue;
            if (note.action !== action)
                continue;
            const delta = Math.abs(currentBeat - note.startBeat);
            if (Math.abs(delta) <= window) {
                return note;
            }
            if (delta < -window) {
                break;
            }
        }
        return null;
    }
    get getActiveNotes() {
        return this.activeNotes;
    }
    get getUpcomingNotes() {
        return this.upcomingNotes;
    }
}
//# sourceMappingURL=NoteManager.js.map