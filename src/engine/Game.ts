import { Clock } from "./Clock";
import { Note } from "../core/Note";
import { Chart } from "../core/ChartTypes";
import { BeatConverter } from "../core/BeatConverter";
import { TimeEngine } from "./TimeEngine";
import { Metronome } from "./Metronome";
import { NoteManager } from "./NoteManager";


export class Game{
    private SPAWN_WINDOW_BEAT: number = 4;
    private MISS_WINDOW_BEAT: number = 0.3;

    private timeEngine: TimeEngine;
    private metronome: Metronome;
    private noteManager: NoteManager;


    constructor(private clock: Clock, private chart: Chart){
        this.timeEngine = new TimeEngine(clock, chart.bpm);
        this.metronome = new Metronome(this.timeEngine);


        this.noteManager = new NoteManager(this.SPAWN_WINDOW_BEAT, this.MISS_WINDOW_BEAT);
    }

    loadChart(){
        const converter = new BeatConverter(this.chart.bpm, this.chart.offset);
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



}