import { BeatSource } from "./BeatSource";

export class AudioManager{
    private audio: HTMLAudioElement;

    constructor(path: string){ 
        this.audio = new Audio(path);
    }

    async play(){
        await this.audio.play();
    }

    pause(){
        this.audio.pause();
    }

    getCurrentTime(){
        return this.audio.currentTime;
    }

    getDuration(){
        return this.audio.duration;
    }
}