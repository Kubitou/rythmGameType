import { Note } from "../core/Note";
export declare class NoteManager {
    private spawnWindow;
    private missWindow;
    private upcomingNotes;
    private activeNotes;
    constructor(spawnWindow: number, missWindow: number);
    load(notes: Note[]): void;
    update(currentBeat: number): void;
    private spawn;
    private despawn;
    get getActiveNotes(): Note[];
    get getUpcomingNotes(): Note[];
}
//# sourceMappingURL=NoteManager.d.ts.map