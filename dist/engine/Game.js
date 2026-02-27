"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Note_1 = require("../core/Note");
const TimeEngine_1 = require("./TimeEngine");
const Metronome_1 = require("./Metronome");
const NoteManager_1 = require("./NoteManager");
const Judge_1 = require("./Judge");
class Game {
    clock;
    chart;
    SPAWN_WINDOW_BEAT = 4;
    MISS_WINDOW_BEAT = 0.3;
    timeEngine;
    metronome;
    noteManager;
    judge;
    constructor(clock, chart) {
        this.clock = clock;
        this.chart = chart;
        this.timeEngine = new TimeEngine_1.TimeEngine(clock, chart.bpm);
        this.metronome = new Metronome_1.Metronome(this.timeEngine);
        this.noteManager = new NoteManager_1.NoteManager(this.SPAWN_WINDOW_BEAT, this.MISS_WINDOW_BEAT);
        this.judge = new Judge_1.Judge(this.noteManager, 0.05, 0.1, 0.2);
    }
    handleInput(action) {
        // const note = this.noteManager.getFirstActiveNote();
        // console.log("FIRST NOTE:", note?.hitBeat);
        const currentBeat = this.timeEngine.preciseBeat;
        // console.log("TRY HIT", currentBeat, action);
        return this.judge.tryHit(currentBeat, action);
    }
    loadChart() {
        let id = 1;
        let notes = [];
        for (const chartNote of this.chart.notes) {
            if (chartNote.type === "tap") {
                notes.push(new Note_1.TapNote(chartNote.beat, id++, chartNote.action, chartNote.size));
            }
            if (chartNote.type === "roll") {
                notes.push(new Note_1.RollNote(chartNote.startBeat, chartNote.endBeat, id++, chartNote.action, chartNote.size));
            }
        }
        this.noteManager.load(notes);
    }
    update(dt) {
        this.clock.advance(dt);
        this.timeEngine.update();
        this.noteManager.update(this.timeEngine.currentBeat);
    }
    getCurrentBeat() {
        return this.timeEngine.preciseBeat;
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map