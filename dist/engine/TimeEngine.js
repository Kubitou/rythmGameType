"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeEngine = void 0;
class TimeEngine {
    clock;
    bpm;
    startTime = 0;
    musicalBeat = 0;
    lastRealTime = 0;
    lastBeatIndex = -1;
    measure = 4;
    constructor(clock, bpm) {
        this.clock = clock;
        this.bpm = bpm;
    }
    start() {
        this.startTime = this.clock.time;
        this.lastRealTime = this.startTime;
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
    timeToBeat(time) {
        return (time - this.startTime) * (this.bpm / 60000);
    }
    get preciseBeat() {
        return this.musicalBeat;
    }
    get currentBeat() {
        return Math.floor(this.musicalBeat);
    }
    get currentMeasure() {
        const beat = this.currentBeat;
        return (beat % this.measure) + 1;
    }
}
exports.TimeEngine = TimeEngine;
//# sourceMappingURL=TimeEngine.js.map