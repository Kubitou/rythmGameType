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

    resetAudio(){
        this.audio.currentTime = 0;
    }

    getCurrentTime(){
        return this.audio.currentTime;
    }

    getDuration(){
        return this.audio.duration;
    }
}