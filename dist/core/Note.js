"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
class Note {
    id;
    hitBeat;
    action;
    size;
    _judged = false;
    constructor(id, hitBeat, action, size) {
        this.id = id;
        this.hitBeat = hitBeat;
        this.action = action;
        this.size = size;
    }
    markJudged() {
        this._judged = true;
    }
    get judged() {
        return this._judged;
    }
}
exports.Note = Note;
//# sourceMappingURL=Note.js.map