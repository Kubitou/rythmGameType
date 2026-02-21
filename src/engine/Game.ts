import { Clock } from "./Clock";
import { Note } from "../core/Note";
import { Chart } from "../core/ChartTypes";
import { TimeEngine } from "./TimeEngine";
import { Metronome } from "./Metronome";
import { NoteManager } from "./NoteManager";
import { Judge } from "./Judge";


export class Game{
    private SPAWN_WINDOW_BEAT: number = 4;
    private MISS_WINDOW_BEAT: number = 0.3;

    private timeEngine: TimeEngine;
    private metronome: Metronome;
    private noteManager: NoteManager;
    private judge: Judge;


    constructor(private clock: Clock, private chart: Chart){
        this.timeEngine = new TimeEngine(clock, chart.bpm);
        this.metronome = new Metronome(this.timeEngine);

        this.noteManager = new NoteManager(this.SPAWN_WINDOW_BEAT, this.MISS_WINDOW_BEAT);
        this.judge = new Judge(this.noteManager, 0.05, 0.1, 0.2);
    }

    handleInput(action: "DON" | "KATSU"){
        // const note = this.noteManager.getFirstActiveNote();
        // console.log("FIRST NOTE:", note?.hitBeat);
        const currentBeat = this.timeEngine.preciseBeat;
        // console.log("TRY HIT", currentBeat, action);
        return this.judge.tryHit(currentBeat, action);
    }

    loadChart(){
        let id = 1;
        let notes: Note[] = [];

        for(const chartNote of this.chart.notes){                   
            const note = new Note(
                id++,
                chartNote.beat,
                chartNote.action,
                chartNote.size
            )

            notes.push(note);
        } 
        this.noteManager.load(notes)
    }

    update(dt: number){
        this.clock.advance(dt);
        this.timeEngine.update();
        this.noteManager.update(this.timeEngine.currentBeat);
    }

    getCurrentBeat(){
        return this.timeEngine.preciseBeat;
    }

}