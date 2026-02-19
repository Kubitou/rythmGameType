"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metronome = void 0;
class Metronome {
    clock;
    bpm;
    measure;
    beatDuration;
    lastBeat = -1;
    constructor(clock, bpm, measure = 4) {
        this.clock = clock;
        this.bpm = bpm;
        this.measure = measure;
        this.beatDuration = 60000 / bpm;
    }
    update() {
        const curretBeat = Math.floor(this.clock.time / this.beatDuration);
        if (curretBeat !== this.lastBeat) {
            this.lastBeat = curretBeat;
            return curretBeat;
        }
        return null;
    }
    get currentMeasure() {
        return Math.floor(this.lastBeat / this.measure);
    }
}
exports.Metronome = Metronome;
//# sourceMappingURL=Metronome.js.map