"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NoteManager_1 = require("./engine/NoteManager");
const Note_1 = require("./core/Note");
const manager = new NoteManager_1.NoteManager(2, // spawnWindow
0.15 // missWindow
);
manager.load([
    new Note_1.TapNote(4.00, 1, "DON", "small"),
    new Note_1.TapNote(4.08, 2, "DON", "small"),
    new Note_1.TapNote(4.16, 3, "DON", "small"),
]);
let beat = 3.5;
function step(b) {
    beat = b;
    console.log("\n=== BEAT", beat.toFixed(3), "===");
    manager.update(beat);
    console.log("ACTIVE:", manager.getActiveNotes.map(n => `${n.id}@${n.startBeat}`));
    const expired = manager.drainExpired();
    for (const note of expired) {
        console.log("MISS:", note.id);
    }
}
function hit(action) {
    console.log("\nINPUT:", action, "at", beat.toFixed(3));
    const note = manager.findClosestTap(beat, action, 0.12);
    if (!note) {
        console.log("RESULT: no note");
        return;
    }
    const delta = Math.abs(beat - note.startBeat);
    let result = "bad";
    if (delta < 0.05)
        result = "perfect";
    else if (delta < 0.09)
        result = "good";
    console.log("JUDGED:", note.id, "delta:", delta.toFixed(3));
    console.log("RESULT:", result);
    manager.remove(note);
}
step(3.8); // spawn
step(3.95); // perto da nota 1
hit("DON"); // deve pegar nota 1
step(4.05);
hit("DON"); // deve pegar nota 2
step(4.20); // nota 3 deve expirar
step(4.30);
step(4.32);
//# sourceMappingURL=main.js.map