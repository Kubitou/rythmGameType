"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
class Clock {
    _time = 0;
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
exports.Clock = Clock;
//# sourceMappingURL=Clock.js.map