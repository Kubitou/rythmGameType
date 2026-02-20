import { TimeEngine } from "./TimeEngine";

export class Metronome{
    constructor(private timeEngine: TimeEngine, private measure = 4){}

    get currentMeasure(){
        const beat = this.timeEngine.currentBeat;
        return (beat % this.measure) + 1;
    }
}