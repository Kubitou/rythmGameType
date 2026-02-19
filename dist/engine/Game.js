"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Note_1 = require("../core/Note");
const BeatConverter_1 = require("../core/BeatConverter");
const Metronome_1 = require("./Metronome");
class Game {
    clock;
    chart;
    upcomingNotes = [];
    activeNotes = [];
    SPAWN_WINDOW = 2000;
    MISS_WINDOW = 150;
    metronome;
    constructor(clock, chart) {
        this.clock = clock;
        this.chart = chart;
        this.metronome = new Metronome_1.Metronome(clock, chart.bpm, 4);
    }
    loadChart() {
        const converter = new BeatConverter_1.BeatConverter(this.chart.bpm, this.chart.offset);
        let id = 1;
        for (const chartNote of this.chart.notes) {
            const hitTime = converter.beatToMS(chartNote.beat);
            const note = new Note_1.Note(id++, hitTime, chartNote.action, chartNote.size);
            this.upcomingNotes.push(note);
        }
        this.upcomingNotes.sort((a, b) => a.hitTime - b.hitTime);
    }
    update(dt) {
        this.clock.advance(dt);
        this.spawnNotes();
        this.despawn();
        this.metronome.update();
    }
    spawnNotes() {
        while (true) {
            const nextNote = this.upcomingNotes[0];
            if (!nextNote)
                break;
            if (nextNote.hitTime > this.clock.time + this.SPAWN_WINDOW)
                break;
            this.activeNotes.push(this.upcomingNotes.shift());
        }
    }
    despawn() {
        while (true) {
            const note = this.activeNotes[0];
            if (!note)
                break;
            if (note.hitTime + this.MISS_WINDOW < this.clock.time) {
                this.activeNotes.shift();
            }
            else {
                break;
            }
        }
    }
    addActiveNote(note) {
        this.activeNotes.push(note);
    }
    getUpcomingNotes() {
        return this.upcomingNotes;
    }
    getActiveNotes() {
        return this.activeNotes;
    }
    get time() {
        return this.clock.time;
    }
    set spawnWindow(spawnWindow) {
        this.SPAWN_WINDOW = spawnWindow;
    }
    set missWindow(missWindow) {
        this.MISS_WINDOW = missWindow;
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map