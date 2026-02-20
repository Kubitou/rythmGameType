import { Clock } from "./Clock";
import { Chart } from "../core/ChartTypes";
export declare class Game {
    private clock;
    private chart;
    private SPAWN_WINDOW_BEAT;
    private MISS_WINDOW_BEAT;
    private timeEngine;
    private metronome;
    private noteManager;
    constructor(clock: Clock, chart: Chart);
    loadChart(): void;
    update(dt: number): void;
}
//# sourceMappingURL=Game.d.ts.map