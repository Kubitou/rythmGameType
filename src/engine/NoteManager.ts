import { Note, TapNote } from "../core/Note";

export class NoteManager {
  private upcomingNotes: Note[] = [];
  private activeNotes: Note[] = [];
  private expiredNotes: Note[] = [];

  constructor(
    private spawnWindow: number,
    private missWindow: number,
  ) {}

  load(notes: Note[]) {
    this.upcomingNotes = [...notes].sort((a, b) => a.startBeat - b.startBeat);
  }

  update(currentBeat: number) {
    this.spawn(currentBeat);
    this.collectExpiredNotes(currentBeat);
  }

  private spawn(currentBeat: number) {
    while (true) {
      const next = this.upcomingNotes[0];
      if (!next) break;

      if (next.startBeat > currentBeat + this.spawnWindow) break;
      // console.log("spawn: ", next.hitBeat);
      this.activeNotes.push(this.upcomingNotes.shift()!);
    }
  }

  private collectExpiredNotes(currentBeat: number) {
    while (true) {
      const note = this.activeNotes[0];
      if (!note) break;

      if ("hitBeat" in note) {
        if (note.startBeat + this.missWindow < currentBeat) {
          this.expiredNotes.push(this.activeNotes.shift()!);
          continue;
        }
      }
      break;
    }
  }

  drainExpired(): Note[] {
    const notes = [...this.expiredNotes];
    this.expiredNotes = [];
    return notes;
  }

  remove(note: Note) {
    const index = this.activeNotes.indexOf(note);
    if (index !== -1) {
      this.activeNotes.splice(index, 1);
    }
  }

  getFirstActiveNote(): Note | null {
    return this.activeNotes.at(0) ?? null;
  }

  get getActiveNotes() {
    return this.activeNotes;
  }

  get getUpcomingNotes() {
    return this.upcomingNotes;
  }
}
