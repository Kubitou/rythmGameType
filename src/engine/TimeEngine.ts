import { Clock } from "./Clock.js";
import { BeatSource } from "./BeatSource.js";

export class TimeEngine implements BeatSource{
    private startTime = 0;
    private musicalBeat = 0;
    private lastRealTime = 0;
    private lastBeatIndex = -1;
    private measure = 4;

    constructor(private clock: Clock, private bpm: number){}
    
    getBeat(): number {
        return this.preciseBeat;
    }

    start(){
        this.startTime = this.clock.time;
        this.lastRealTime = this.startTime;
    }

    update(): number | null {
        const now = this.clock.time;
        const deltaReal = now - this.lastRealTime;
        this.lastRealTime = now;

        const beatPerMS = this.bpm / 60000;
        this.musicalBeat += deltaReal * beatPerMS;

        const beatIndex = Math.floor(this.musicalBeat);

        if(beatIndex !== this.lastBeatIndex){
            this.lastBeatIndex = beatIndex;
            return beatIndex;
        }

        return null;
    }

    timeToBeat(time: number){
        return (time - this.startTime) * (this.bpm / 60000);
    }

    resetTime(){
        this.startTime = this.clock.time;
        this.lastRealTime = this.startTime;
        this.musicalBeat = 0;
        this.lastBeatIndex = -1;
    }

    get preciseBeat(){
        return this.musicalBeat;
    }

    get currentBeat(){
        return Math.floor(this.musicalBeat);
    }

    get currentMeasure(){
        const beat = this.currentBeat;
        return (beat % this.measure) + 1;
    }

    
}