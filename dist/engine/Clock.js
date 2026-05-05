export class Clock {
    constructor() {
        this._time = 0;
    }
    advance(dt) {
        this._time += dt;
    }
    reset() {
        this._time = 0;
    }
    get time() {
        return this._time;
    }
}
//# sourceMappingURL=Clock.js.map