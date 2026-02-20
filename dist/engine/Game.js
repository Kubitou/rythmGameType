"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Note_1 = require("../core/Note");
const BeatConverter_1 = require("../core/BeatConverter");
const TimeEngine_1 = require("./TimeEngine");
const Metronome_1 = require("./Metronome");
const NoteManager_1 = require("./NoteManager");
class Game {
    clock;
    chart;
    SPAWN_WINDOW_BEAT = 4;
    MISS_WINDOW_BEAT = 0.3;
    timeEngine;
    metronome;
    noteManager;
    constructor(clock, chart) {
        this.clock = clock;
        this.chart = chart;
        this.timeEngine = new TimeEngine_1.TimeEngine(clock, chart.bpm);
        this.metronome = new Metronome_1.Metronome(this.timeEngine);
        this.noteManager = new NoteManager_1.NoteManager(this.SPAWN_WINDOW_BEAT, this.MISS_WINDOW_BEAT);
    }
    loadChart() {
        const converter = new BeatConverter_1.BeatConverter(this.chart.bpm, this.chart.offset);
        let id = 1;
        let notes = [];
        for (const chartNote of this.chart.notes) {
            const note = new Note_1.Note(id++, chartNote.beat, chartNote.action, chartNote.size);
            notes.push(note);
        }
        this.noteManager.load(notes);
    }
    update(dt) {
        this.clock.advance(dt);
        this.timeEngine.update();
        this.noteManager.update(this.timeEngine.currentBeat);
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map