"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeEngine = void 0;
class TimeEngine {
    clock;
    bpm;
    musicalBeat = 0;
    lastRealTime = 0;
    lastBeatIndex = -1;
    constructor(clock, bpm) {
        this.clock = clock;
        this.bpm = bpm;
    }
    update() {
        const now = this.clock.time;
        const deltaReal = now - this.lastRealTime;
        this.lastRealTime = now;
        const beatPerMS = this.bpm / 60000;
        this.musicalBeat += deltaReal * beatPerMS;
        const beatIndex = Math.floor(this.musicalBeat);
        if (beatIndex !== this.lastBeatIndex) {
            this.lastBeatIndex = beatIndex;
            return beatIndex;
        }
        return null;
    }
    get preciseBeat() {
        return this.musicalBeat;
    }
    get currentBeat() {
        return Math.floor(this.musicalBeat);
    }
}
exports.TimeEngine = TimeEngine;
//# sourceMappingURL=TimeEngine.js.map