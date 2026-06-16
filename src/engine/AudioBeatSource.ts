import { BeatSource } from "./BeatSource";
import { AudioManager } from "./AudioManager";

export class AudioBeatSource implements BeatSource{
    constructor(private audio: AudioManager, private bpm: number, private offset: number){}

    getBeat(): number{
        return (
            (this.audio.getCurrentTime() - this.offset)
            * this.bpm
            / 60
        );
    }

}