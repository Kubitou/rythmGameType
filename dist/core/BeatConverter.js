"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeatConverter = void 0;
class BeatConverter {
    bpm;
    offset;
    constructor(bpm, offset) {
        this.bpm = bpm;
        this.offset = offset;
    }
    beatToMS(beat) {
        const beatDuration = 60000 / this.bpm;
        return this.offset + beat * beatDuration;
    }
}
exports.BeatConverter = BeatConverter;
//# sourceMappingURL=BeatConverter.js.map