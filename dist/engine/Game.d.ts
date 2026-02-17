import { Clock } from "./Clock";
import { Note } from "../core/Note";
import { Chart } from "../core/ChartTypes";
export declare class Game {
    private clock;
    private upcomingNotes;
    private activeNotes;
    private SPAWN_WINDOW;
    private MISS_WINDOW;
    constructor(clock: Clock);
    loadChart(chart: Chart): void;
    update(dt: number): void;
    private spawnNotes;
    private despawn;
    addActiveNote(note: Note): void;
    getUpcomingNotes(): readonly Note[];
    getActiveNotes(): readonly Note[];
    get time(): number;
}
//# sourceMappingURL=Game.d.ts.map