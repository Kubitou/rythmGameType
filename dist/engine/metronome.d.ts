import { Clock } from "./Clock";
export declare class Metronome {
    private clock;
    private bpm;
    private measure;
    private beatDuration;
    private lastBeat;
    constructor(clock: Clock, bpm: number, measure?: number);
    update(): number | null;
    get currentMeasure(): number;
}
//# sourceMappingURL=Metronome.d.ts.map