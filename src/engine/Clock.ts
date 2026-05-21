export class Clock{
    private _time = 0;

    advance(dt: number){
        this._time += dt;
    }

    reset(){
        this._time = 0;
    }

    get time(): number{
        return this._time
    }
}