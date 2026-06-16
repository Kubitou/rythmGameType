export class AudioBeatSource {
    constructor(audio, bpm, offset) {
        this.audio = audio;
        this.bpm = bpm;
        this.offset = offset;
    }
    getBeat() {
        return ((this.audio.getCurrentTime() - this.offset)
            * this.bpm
            / 60);
    }
}
//# sourceMappingURL=AudioBeatSource.js.map