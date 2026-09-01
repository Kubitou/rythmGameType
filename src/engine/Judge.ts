import { NoteAction } from "../core/ChartTypes.js";
import { NoteManager } from "./NoteManager.js";

type Judgment = "perfect" | "good" | "bad" | "miss" | null;

export class Judge {
  constructor(
    private noteManager: NoteManager,
    private perfectWindow: number,
    private goodWindow: number,
    private badWindow: number,
  ) {}

  private lastInputBeat = -Infinity;
  private inputCooldown = 0.05;
  private lastNoteId = 0;

  tryHit(currentBeat: number, action: NoteAction): Judgment {
    const EPSILON = 0.000001;

    const note = this.noteManager.findClosestTap(
      currentBeat,
      action,
      this.badWindow,
    );

    if (!note) return null;

    if (note.action !== action) return null;

    if (currentBeat - this.lastInputBeat < this.inputCooldown) return null;

    // console.log("JUDGING NOTE:", note.id, note.startBeat);
    this.lastInputBeat = currentBeat;

    const delta = currentBeat - note.hitBeat;

    if (delta < -this.badWindow) return null;

    const abs = Math.abs(delta);

    console.log("delta:", delta, "abs:", abs);

    if (abs <= this.perfectWindow + EPSILON) {
      note.markJudged();
      this.lastNoteId = note.id;
      this.noteManager.remove(note);
      return "perfect";
    }

    if (abs <= this.goodWindow + EPSILON) {
      note.markJudged();
      this.lastNoteId = note.id;
      this.noteManager.remove(note);
      return "good";
    }

    if (abs <= this.badWindow + EPSILON) {
      note.markJudged();
      this.lastNoteId = note.id;
      this.noteManager.remove(note);
      return "bad";
    }

    note.markJudged();
    this.lastNoteId = note.id;
    this.noteManager.remove(note);
    return "miss";
  }

  resetJudge() {
    this.lastInputBeat = -Infinity;
    this.lastNoteId = 0;
  }

  get lastHitNoteId() {
    return this.lastNoteId;
  }
}
