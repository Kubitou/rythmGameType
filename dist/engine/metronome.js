"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metronome = void 0;
class Metronome {
    timeEngine;
    measure;
    constructor(timeEngine, measure = 4) {
        this.timeEngine = timeEngine;
        this.measure = measure;
    }
    get currentMeasure() {
        const beat = this.timeEngine.currentBeat;
        return (beat % this.measure) + 1;
    }
}
exports.Metronome = Metronome;
//# sourceMappingURL=Metronome.js.map