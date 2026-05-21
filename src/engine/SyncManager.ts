import { Clock } from "./Clock.js";

class SyncManager{
    constructor(
        private clock: Clock,
        private audio: HTMLAudioElement
    ){}

    checkDrift(){
        const engineTime = this.clock.time / 1000;
        const audioTime = this.audio.currentTime;

        const drift = audioTime - engineTime;

        return drift;
    }
}