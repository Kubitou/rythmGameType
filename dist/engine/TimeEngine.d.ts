import { Clock } from "./Clock";
export declare class TimeEngine {
    private clock;
    private bpm;
    private musicalBeat;
    private lastRealTime;
    private lastBeatIndex;
    constructor(clock: Clock, bpm: number);
    update(): number | null;
    get currentBeat(): number;
}
//# sourceMappingURL=TimeEngine.d.ts.map