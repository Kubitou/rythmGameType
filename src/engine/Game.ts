import { Clock } from "./Clock";
import { Note, RollNote, TapNote } from "../core/Note";
import { Chart } from "../core/ChartTypes";
import { TimeEngine } from "./TimeEngine";
import { NoteManager } from "./NoteManager";
import { Judge } from "./Judge";
import { ComboManager } from "./ComboManager";
import { HitStats } from "./HitStats";
import { HitEvent } from "../core/HitEvent";

export class Game {
  private SPAWN_WINDOW_BEAT: number = 4;
  private MISS_WINDOW_BEAT: number = 0.3;

  private timeEngine: TimeEngine;
  private noteManager: NoteManager;
  private judge: Judge;
  private comboManager: ComboManager;
  private stats: HitStats;

  constructor(
    private clock: Clock,
    private chart: Chart,
  ) {
    this.timeEngine = new TimeEngine(clock, chart.bpm);

    this.noteManager = new NoteManager(
      this.SPAWN_WINDOW_BEAT,
      this.MISS_WINDOW_BEAT,
    );

    this.judge = new Judge(this.noteManager, 0.05, 0.1, 0.2);
    this.comboManager = new ComboManager();
    this.stats = new HitStats();
  }

  handleInput(action: "DON" | "KATSU") {
    const currentBeat = this.timeEngine.preciseBeat;

    const activeRoll = this.noteManager.getActiveRoll();
    if (activeRoll && activeRoll.isActive) {
      const result = activeRoll.tryHit(action);

      if (result === "roll-hit") {
        const event: HitEvent = {
          type: "roll-hit",
          noteId: activeRoll.id,
        }
        this.stats.register(event);
        this.comboManager.incrementCombo();
      }
      return result;
    }

    const result = this.judge.tryHit(currentBeat, action);

    if (result === "perfect" || result === "good") {
      const event: HitEvent = {
        type: result,
        noteId: this.judge.lastHitNoteId
      }
      this.stats.register(event);
      this.comboManager.incrementCombo();
    }

    if(result === "bad"){
      const event: HitEvent = {
        type: result,
        noteId: this.judge.lastHitNoteId
      }
      this.stats.register(event);
      this.comboManager.resetCombo();
    }

    if (result === "miss") {
      const event: HitEvent = {
        type: result,
        noteId: this.judge.lastHitNoteId
      }
      this.stats.register(event);
      this.comboManager.resetCombo();
    }

    return result;
  }

  loadChart() {
    let id = 1;
    let notes: Note[] = [];

    for (const chartNote of this.chart.notes) {
      if (chartNote.type === "roll") {
        notes.push(
          new RollNote(
            chartNote.startBeat,
            chartNote.endBeat,
            id++,
            chartNote.action,
            chartNote.size,
          ),
        );
        continue;
      }
      notes.push(
        new TapNote(chartNote.beat, id++, chartNote.action, chartNote.size),
      );
    }
    this.noteManager.load(notes);
  }

  update(dt: number) {
    this.clock.advance(dt);
    this.timeEngine.update();

    const beat = this.timeEngine.preciseBeat;

    this.noteManager.update(beat);

    for (const note of this.noteManager.getActiveNotes) {
      if (note instanceof RollNote) {
        note.updateRoll(beat);
        if (note.isFinished) this.noteManager.remove(note);
      }
    }

    const expired = this.noteManager.drainExpired();
    
    for(const note of expired){
      console.log("EXPIRED:", note.id, note.constructor.name);

      if(note instanceof TapNote){
        console.log("MISS REGISTERED:", note.id);
        const event: HitEvent = {
        type: "miss",
        noteId: this.judge.lastHitNoteId
      }
      this.stats.register(event);
        this.comboManager.resetCombo();
      }
    }
  }

  getCurrentBeat() {
    return this.timeEngine.preciseBeat;
  }

  getStats(){
    return this.stats;
  }
}
