"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollNote = exports.TapNote = exports.Note = void 0;
class Note {
    id;
    action;
    size;
    constructor(id, action, size) {
        this.id = id;
        this.action = action;
        this.size = size;
    }
}
exports.Note = Note;
class TapNote extends Note {
    hitBeat;
    constructor(hitBeat, id, action, size) {
        super(id, action, size);
        this.hitBeat = hitBeat;
    }
    get startBeat() {
        return this.hitBeat;
    }
    getExpireBeat() {
        return this.startBeat;
    }
    _judged = false;
    markJudged() {
        this._judged = true;
    }
    get judged() {
        return this._judged;
    }
}
exports.TapNote = TapNote;
class RollNote extends Note {
    startBeat;
    endBeat;
    constructor(startBeat, endBeat, id, action, size) {
        super(id, action, size);
        this.startBeat = startBeat;
        this.endBeat = endBeat;
    }
    hitCount = 0;
    state = "waiting";
    updateRoll(currentBeat) {
        if (this.state === "finished")
            return;
        if (currentBeat >= this.startBeat && currentBeat <= this.endBeat) {
            this.state = "active";
            return;
        }
        if (currentBeat > this.endBeat) {
            this.state = "finished";
        }
    }
    tryHit(action) {
        if (this.state !== "active")
            return null;
        if (action !== this.action)
            return null;
        this.hitCount++;
        return "roll-hit";
    }
    getExpireBeat() {
        return this.endBeat;
    }
    get numberOfHits() {
        return this.hitCount;
    }
    get rollState() {
        return this.state;
    }
    get isActive() {
        return this.state === "active";
    }
    get isFinished() {
        return this.state === "finished";
    }
}
exports.RollNote = RollNote;
//# sourceMappingURL=Note.js.map