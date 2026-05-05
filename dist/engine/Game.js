"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Note_1 = require("../core/Note");
const TimeEngine_1 = require("./TimeEngine");
const NoteManager_1 = require("./NoteManager");
const Judge_1 = require("./Judge");
const ComboManager_1 = require("./ComboManager");
const HitStats_1 = require("./HitStats");
class Game {
    clock;
    chart;
    SPAWN_WINDOW_BEAT = 4;
    MISS_WINDOW_BEAT = 0.3;
    timeEngine;
    noteManager;
    judge;
    comboManager;
    stats;
    registerHit(type, noteId) {
        this.stats.register({ type, noteId });
    }
    constructor(clock, chart) {
        this.clock = clock;
        this.chart = chart;
        this.timeEngine = new TimeEngine_1.TimeEngine(clock, chart.bpm);
        this.noteManager = new NoteManager_1.NoteManager(this.SPAWN_WINDOW_BEAT, this.MISS_WINDOW_BEAT);
        this.judge = new Judge_1.Judge(this.noteManager, 0.05, 0.1, 0.2);
        this.comboManager = new ComboManager_1.ComboManager();
        this.stats = new HitStats_1.HitStats();
    }
    handleInput(action) {
        const currentBeat = this.timeEngine.preciseBeat;
        const activeRoll = this.noteManager.getActiveRoll();
        if (activeRoll && activeRoll.isActive) {
            const result = activeRoll.tryHit(action);
            if (result === "roll-hit") {
                this.registerHit(result, this.judge.lastHitNoteId);
                this.comboManager.incrementCombo();
            }
            return result;
        }
        const result = this.judge.tryHit(currentBeat, action);
        if (result === "perfect" || result === "good") {
            this.registerHit(result, this.judge.lastHitNoteId);
            this.comboManager.incrementCombo();
        }
        if (result === "bad") {
            this.registerHit(result, this.judge.lastHitNoteId);
            this.comboManager.resetCombo();
        }
        if (result === "miss") {
            this.registerHit(result, this.judge.lastHitNoteId);
            this.comboManager.resetCombo();
        }
        return result;
    }
    loadChart() {
        let id = 1;
        let notes = [];
        for (const chartNote of this.chart.notes) {
            if (chartNote.type === "roll") {
                notes.push(new Note_1.RollNote(chartNote.startBeat, chartNote.endBeat, id++, chartNote.action, chartNote.size));
                continue;
            }
            notes.push(new Note_1.TapNote(chartNote.beat, id++, chartNote.action, chartNote.size));
        }
        this.noteManager.load(notes);
    }
    update(dt) {
        this.clock.advance(dt);
        this.timeEngine.update();
        const beat = this.timeEngine.preciseBeat;
        this.noteManager.update(beat);
        for (const note of this.noteManager.getActiveNotes) {
            if (note instanceof Note_1.RollNote) {
                note.updateRoll(beat);
                if (note.isFinished)
                    this.noteManager.remove(note);
            }
        }
        const expired = this.noteManager.drainExpired();
        for (const note of expired) {
            // console.log("EXPIRED:", note.id, note.constructor.name);
            if (note instanceof Note_1.TapNote) {
                // console.log("MISS REGISTERED:", note.id);
                const event = {
                    type: "miss",
                    noteId: note.id
                };
                this.stats.register(event);
                this.comboManager.resetCombo();
            }
        }
    }
    getCurrentBeat() {
        return this.timeEngine.preciseBeat;
    }
    getStats() {
        return this.stats;
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map