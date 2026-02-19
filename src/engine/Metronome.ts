import { Clock } from "./Clock";
import { Chart } from "../core/ChartTypes";

export class Metronome{
    private beatDuration: number;
    private lastBeat = -1;

    constructor(private clock: Clock, private bpm: number, private measure: number = 4){
        this.beatDuration = 60000 / bpm;
    }

    update(): number | null{
        const curretBeat = Math.floor(this.clock.time / this.beatDuration);
        if(curretBeat !== this.lastBeat){
            this.lastBeat = curretBeat;
            return curretBeat;
        }
        return null;
    }

    get currentMeasure(): number{
        return Math.floor(this.lastBeat / this.measure)
    }
}