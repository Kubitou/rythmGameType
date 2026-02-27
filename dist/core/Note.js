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
}
exports.RollNote = RollNote;
//# sourceMappingURL=Note.js.map