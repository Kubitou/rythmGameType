import { Clock } from "./Clock";
import { Note } from "../core/Note";
import { Chart } from "../core/ChartTypes";
import { BeatConverter } from "../core/BeatConverter";
import { TimeEngine } from "./TimeEngine";


export class Game{
    private upcomingNotes: Note[] = [];
    private activeNotes: Note[] = [];

    private SPAWN_WINDOW: number = 2000;
    private MISS_WINDOW: number = 150;

    private timeEngine: TimeEngine;

    constructor(private clock: Clock, private chart: Chart){
        this.timeEngine = new TimeEngine(clock, chart.bpm);
    }

    loadChart(){
        const converter = new BeatConverter(this.chart.bpm, this.chart.offset);
        let id = 1;

        for(const chartNote of this.chart.notes){                   
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
        this.timeEngine.update();
    }

    private spawnNotes() {
        while (true) {
            const nextNote = this.upcomingNotes[0];
            if (!nextNote) break;

            if (nextNote.hitTime > this.clock.time + this.SPAWN_WINDOW) break;

            this.activeNotes.push(this.upcomingNotes.shift()!);
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

    set spawnWindow(spawnWindow: number){
        this.SPAWN_WINDOW = spawnWindow;
    }

    set missWindow(missWindow: number){
        this.MISS_WINDOW = missWindow;
    }
}