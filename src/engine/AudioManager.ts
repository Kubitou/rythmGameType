import { BeatSource } from "./BeatSource";

export class AudioManager implements BeatSource{
    private audio: HTMLAudioElement;

    constructor(path: string, private bpm: number, private offset: number = 0){ 
        this.audio = new Audio(path);
    }

    getBeat(): number {
        return this.offset + this.audio.currentTime * (this.bpm / 60);
    }

    play(){
        this.audio.play();
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