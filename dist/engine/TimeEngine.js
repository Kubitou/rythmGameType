export class TimeEngine {
    constructor(clock, bpm) {
        this.clock = clock;
        this.bpm = bpm;
        this.startTime = 0;
        this.musicalBeat = 0;
        this.lastRealTime = 0;
        this.lastBeatIndex = -1;
        this.measure = 4;
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
//# sourceMappingURL=TimeEngine.js.map