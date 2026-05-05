import { Clock } from "./Clock.js";
import { Note, RollNote, TapNote } from "../core/Note.js";
import { Chart } from "../core/ChartTypes.js";
import { TimeEngine } from "./TimeEngine.js";
import { NoteManager } from "./NoteManager.js";
import { Judge } from "./Judge.js";
import { ComboManager } from "./ComboManager.js";
import { HitStats } from "./HitStats.js";
import { HitEvent } from "../core/HitEvent.js";

type GameState = 
| "idle" 
| "playing" 
| "paused" 
| "finished";

export class Game {
  private SPAWN_WINDOW_BEAT: number = 4;
  private MISS_WINDOW_BEAT: number = 0.3;

  private timeEngine: TimeEngine;
  private noteManager: NoteManager;
  private judge: Judge;
  private comboManager: ComboManager;
  private stats: HitStats;

  private timeScale = 1;

  private state: GameState = "idle";

  private registerHit(type: HitEvent["type"], noteId: number){
    this.stats.register({type, noteId});
    
    if(type === "perfect" || type === "good"){
      this.comboManager.incrementCombo();
    } else {
      this.comboManager.resetCombo();
    }
  }

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

  setTimeScale(scale: number){
    this.timeScale = scale;
  }

  start(){
    this.loadChart();
    this.state = "playing";
  }

  handleInput(action: "DON" | "KATSU") {
    if(this.state !== "playing") return;

    const currentBeat = this.timeEngine.preciseBeat;

    const activeRoll = this.noteManager.getActiveRoll();
    if (activeRoll && activeRoll.isActive) {
      const result = activeRoll.tryHit(action);

      if (result === "roll-hit") {
        this.registerHit(result, activeRoll.id);
      }
      return result;
    }

    const result = this.judge.tryHit(currentBeat, action);

    if(result)
      this.registerHit(result, this.judge.lastHitNoteId);
   
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
    if(this.state !== "playing") return;

    const scaleDt = dt * this.timeScale;

    this.clock.advance(scaleDt);
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
      // console.log("EXPIRED:", note.id, note.constructor.name);

      if(note instanceof TapNote){
        // console.log("MISS REGISTERED:", note.id);
        const event: HitEvent = {
        type: "miss",
        noteId: note.id
      }
      this.registerHit("miss", note.id);
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
