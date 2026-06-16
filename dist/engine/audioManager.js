export class AudioManager {
    constructor(path, bpm, offset = 0) {
        this.bpm = bpm;
        this.offset = offset;
        this.audio = new Audio(path);
    }
    getBeat() {
        return this.offset + this.audio.currentTime * (this.bpm / 60);
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
    getCurrentTime() {
        return this.audio.currentTime;
    }
    getDuration() {
        return this.audio.duration;
    }
}
//# sourceMappingURL=audioManager.js.map