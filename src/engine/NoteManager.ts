import { Note } from "../core/Note";

export class NoteManager{
    private upcomingNotes: Note[] = [];
    private activeNotes: Note[] = [];

    constructor(
        private spawnWindow: number,
        private missWindow: number
    ){}

    load(notes: Note[]){
        this.upcomingNotes = [...notes].sort((a,b) => a.hitBeat - b.hitBeat);
    }

    update(currentBeat: number){
        this.spawn(currentBeat);
        this.despawn(currentBeat);
    }

    private spawn(currentBeat: number){
        while(true){
            const next = this.upcomingNotes[0];
            if(!next) break;

            if(next.hitBeat > currentBeat + this.spawnWindow) break;

            this.activeNotes.push(this.upcomingNotes.shift()!);
            console.log("Spawn:", next.hitBeat);
        }
    }

    private despawn(currentBeat: number){
        while(true){
            const note = this.activeNotes[0];
            if(!note) break;

            if(note.hitBeat + this.missWindow < currentBeat){
                console.log("Miss:", note.hitBeat);
                this.activeNotes.shift();
            }else break;
        }
    }

    get getActiveNotes(){
        return this.activeNotes;
    }

    get getUpcomingNotes(){
        return this.upcomingNotes;
    }
}