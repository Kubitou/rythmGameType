import { Clock } from "./Clock.js";
import { Note, RollNote, TapNote } from "../core/Note.js";
import { Chart } from "../core/ChartTypes.js";
import { TimeEngine } from "./TimeEngine.js";
import { NoteManager } from "./NoteManager.js";
import { Judge } from "./Judge.js";
import { ComboManager } from "./ComboManager.js";
import { HitEvent } from "../core/HitEvent.js";
import { BeatSource } from "./BeatSource.js";
import { RenderConfig } from "../render/RenderConfig.js";
import { GameplayConfig } from "../core/GameplayConfig.js";
import { ScoreManager } from "./ScoreManager.js"

type GameState =
  | "idle"
  | "playing"
  | "paused"
  | "finished";

type RenderNote = {
  id: number;
  beat: number;
  action: "DON" | "KATSU";
  //size: "small" | "big";
  kind: "tap" | "roll";

  startBeat?: number;
  endBeat?: number;
}

type HudData = {
  combo: number;
  score: number;
  lastJudment: HitEvent["type"] | null;
}

//type TimingMode = | "engine" | "audio";

export class Game {
  private SPAWN_WINDOW_BEAT: number = RenderConfig.SPAWN_WINDOW_BEAT;
  private MISS_WINDOW_BEAT: number = GameplayConfig.MISS_WINDOW_BEAT;

  private timeEngine: TimeEngine;
  private beatSource: BeatSource;

  private noteManager: NoteManager;
  private judge: Judge;
  private comboManager: ComboManager;
  private score: ScoreManager;

  private timeScale = 1;

  private state: GameState = "idle";

  private lastJudment: HitEvent["type"] | null = null;

  private registerHit(type: HitEvent["type"], noteId: number) {
    console.log(type);
    this.lastJudment = type;

    this.score.register({ type, noteId });

    switch (type) {
      case "perfect":
      case "good":
      case "bad":
        this.comboManager.incrementCombo();
        break;

      case "miss":
        this.comboManager.resetCombo();
        break;

      case "roll-hit":

        break;
    }
  }

  constructor(
    private clock: Clock,
    private chart: Chart,
    beatSource?: BeatSource
  ) {
    this.timeEngine = new TimeEngine(clock, chart.bpm);
    this.beatSource = beatSource ?? this.timeEngine;

    this.noteManager = new NoteManager(
      this.SPAWN_WINDOW_BEAT,
      this.MISS_WINDOW_BEAT,
    );

    this.judge = new Judge(this.noteManager, 0.05, 0.1, 0.2);
    this.comboManager = new ComboManager();
    this.score = new ScoreManager();
  }

  setTimeScale(scale: number) {
    this.timeScale = scale;
  }

  start() {
    this.loadChart();
    this.state = "playing";
  }

  handleInput(action: "DON" | "KATSU") {
    if (this.state !== "playing") return;

    const currentBeat = this.beatSource.getBeat();

    const activeRoll = this.noteManager.getActiveRoll();
    if (activeRoll && activeRoll.isActive) {
      const result = activeRoll.tryHit(action);

      if (result === "roll-hit") {
        this.registerHit(result, activeRoll.id);
      }
      return result;
    }

    const result = this.judge.tryHit(currentBeat, action);

    if (result)
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
    if (this.state !== "playing") return;

    const scaleDt = dt * this.timeScale;

    if (this.beatSource === this.timeEngine) {
      this.clock.advance(scaleDt);
      this.timeEngine.update();
    }
    const beat = this.beatSource.getBeat();

    this.noteManager.update(beat);

    for (const note of this.noteManager.getActiveNotes) {
      if (note instanceof RollNote) {
        note.updateRoll(beat);
        if (note.isFinished) this.noteManager.remove(note);
      }
    }

    const expired = this.noteManager.drainExpired();

    for (const note of expired) {
      // console.log("EXPIRED:", note.id, note.constructor.name);

      if (note instanceof TapNote) {
        // console.log("MISS REGISTERED:", note.id);
        this.registerHit("miss", note.id);
      }
    }
  }

  getCurrentBeat() {
    return this.beatSource.getBeat();
  }

  getStats() {
    return this.score;
  }

  // getActiveNotes() {
  //   return this.noteManager.getActiveNotes;
  // }

  getRenderNotes(): RenderNote[] {
    return this.noteManager.getActiveNotes.map(note => {
      if (note instanceof RollNote) {
        return {
          id: note.id,
          action: note.action,
          beat: note.startBeat,
          kind: "roll",
          startBeat: note.startBeat,
          endBeat: note.endBeat,
        };
      }

      return {
        id: note.id,
        action: note.action,
        kind: "tap",
        beat: note.startBeat,
      };
    });
  }

  getHudData(): HudData {
    return {
      combo: this.comboManager.getCurrentCombo,
      score: this.score.getScore,
      lastJudment: this.lastJudment
    };
  }
}
