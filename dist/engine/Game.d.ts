import { Clock } from "./Clock";
import { Note } from "../core/Note";
import { Chart } from "../core/ChartTypes";
export declare class Game {
    private clock;
    private chart;
    private upcomingNotes;
    private activeNotes;
    private SPAWN_WINDOW;
    private MISS_WINDOW;
    private metronome;
    constructor(clock: Clock, chart: Chart);
    loadChart(): void;
    update(dt: number): void;
    private spawnNotes;
    private despawn;
    addActiveNote(note: Note): void;
    getUpcomingNotes(): readonly Note[];
    getActiveNotes(): readonly Note[];
    get time(): number;
    set spawnWindow(spawnWindow: number);
    set missWindow(missWindow: number);
}
//# sourceMappingURL=Game.d.ts.map