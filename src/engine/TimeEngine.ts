import { Clock } from "./Clock";

export class TimeEngine{
    private musicalBeat = 0;
    private lastRealTime = 0;
    private lastBeatIndex = -1;
    private measure = 4;

    constructor(private clock: Clock, private bpm: number){}

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