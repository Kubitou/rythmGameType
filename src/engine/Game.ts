import { Clock } from "./Clock";
import { Note } from "../core/Note";
import { Chart } from "../core/ChartTypes";
import { BeatConverter } from "../core/BeatConverter";

export class Game{
    private upcomingNotes: Note[] = [];
    private activeNotes: Note[] = [];
    private SPAWN_WINDOW: number = 2000;
    private MISS_WINDOW: number = 150;

    constructor(private clock: Clock){}

    loadChart(chart: Chart){
        const converter = new BeatConverter(chart.bpm, chart.offset);
        
         //active notes | upcoming notes
         //0 400 800 | 1000 | 1400 ------
        let id = 1;

        for(const chartNote of chart.notes){                   
            const hitTime = converter.beatToMS(chartNote.beat);
            const note = new Note(
                id++,
                hitTime,
                chartNote.action,
                chartNote.size
            )  
            this.upcomingNotes.push(note);
        } 
        this.upcomingNotes.sort((a, b) => a.hitTime - b.hitTime);
    }

    update(dt: number){
        this.clock.advance(dt);
        this.spawnNotes();
        this.despawn();
    }

    private spawnNotes() {
        while (true) {
            const nextNote = this.upcomingNotes[0];
            if (!nextNote) break;

            if (nextNote.hitTime > this.clock.time + this.SPAWN_WINDOW) break;

            this.activeNotes.push(this.upcomingNotes.shift()!);
            this.despawn();
        }
    }

    private despawn(){
        while(true){
            const note = this.activeNotes[0];
            if(!note) break;

            if(note.hitTime + this.MISS_WINDOW < this.clock.time){
                this.activeNotes.shift();
            }else{
                break;
            }
        }
    }

    addActiveNote(note: Note){
        this.activeNotes.push(note);
    }

    getUpcomingNotes(): readonly Note[]{
        return this.upcomingNotes;
    }

    getActiveNotes(): readonly Note[]{
        return this.activeNotes;
    }

    get time():number {
        return this.clock.time;
    }
}