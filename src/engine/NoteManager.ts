import { Note, RollNote, TapNote } from "../core/Note";

export class NoteManager {
  private upcomingNotes: Note[] = [];
  private activeNotes: Note[] = [];
  private expiredNotes: Note[] = [];
  private activeRoll: RollNote | null = null;

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
    if(this.activeRoll && this.activeRoll.isFinished){
      this.activeRoll = null;
    }
  }

  private spawn(currentBeat: number) {
    while (true) {
      const next = this.upcomingNotes[0];
      if (!next) break;

      if (next.startBeat > currentBeat + this.spawnWindow) break;

      const spawned = this.upcomingNotes.shift()!;
      this.activeNotes.push(spawned);
      
      if(spawned instanceof RollNote){
        this.activeRoll = spawned;
      }
    }
  }

  private collectExpiredNotes(currentBeat: number) {
    while (true) {
      const note = this.activeNotes[0];
      if (!note) break;

      if (note.getExpireBeat() + this.missWindow < currentBeat) {
        this.expiredNotes.push(this.activeNotes.shift()!);
        continue;
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
    if(note === this.activeRoll){
      this.activeRoll = null;
    }
  }

  getActiveRoll(): RollNote | null{
    if(!this.activeRoll) return null;
    if(this.activeRoll.isFinished) return null;
    return this.activeRoll;
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
