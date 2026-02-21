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
            // console.log("spawn: ", next.hitBeat);
            this.activeNotes.push(this.upcomingNotes.shift()!);
        }
    }

    private despawn(currentBeat: number){
        while(true){
            const note = this.activeNotes[0];
            if(!note) break;

            if(note.hitBeat + this.missWindow < currentBeat){
                // console.log("despawn: ", note.hitBeat);
                this.activeNotes.shift();
            }else break;
        }
    }

    remove(note: Note){
        const index = this.activeNotes.indexOf(note);
        if(index !== -1){
            this.activeNotes.splice(index, 1);
        }
    }

    getFirstActiveNote(){
        if(this.activeNotes.length === 0) return null;
        return this.activeNotes[0]
    }

    get getActiveNotes(){
        return this.activeNotes;
    }

    get getUpcomingNotes(){
        return this.upcomingNotes;
    }
}