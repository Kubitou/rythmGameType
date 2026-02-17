"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
class Note {
    id;
    hitTime;
    action;
    size;
    _judged = false;
    constructor(id, hitTime, action, size) {
        this.id = id;
        this.hitTime = hitTime;
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