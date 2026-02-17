export class BeatConverter{
    constructor(private bpm: number, private offset: number){}

    beatToMS(beat: number): number{
        const beatDuration = 60000 / this.bpm
        return this.offset + beat * beatDuration;
    }
}