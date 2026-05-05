export class BeatConverter {
    constructor(bpm, offset) {
        this.bpm = bpm;
        this.offset = offset;
    }
    beatToMS(beat) {
        const beatDuration = 60000 / this.bpm;
        return this.offset + beat * beatDuration;
    }
}
//# sourceMappingURL=BeatConverter.js.map