class SyncManager {
    constructor(clock, audio) {
        this.clock = clock;
        this.audio = audio;
    }
    checkDrift() {
        const engineTime = this.clock.time / 1000;
        const audioTime = this.audio.currentTime;
        const drift = audioTime - engineTime;
        return drift;
    }
}
export {};
//# sourceMappingURL=SyncManager.js.map