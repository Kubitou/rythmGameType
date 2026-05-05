export class Note {
    constructor(id, action, size) {
        this.id = id;
        this.action = action;
        this.size = size;
    }
}
export class TapNote extends Note {
    constructor(hitBeat, id, action, size) {
        super(id, action, size);
        this.hitBeat = hitBeat;
        this._judged = false;
    }
    get startBeat() {
        return this.hitBeat;
    }
    getExpireBeat() {
        return this.startBeat;
    }
    markJudged() {
        this._judged = true;
    }
    get judged() {
        return this._judged;
    }
}
export class RollNote extends Note {
    constructor(startBeat, endBeat, id, action, size) {
        super(id, action, size);
        this.startBeat = startBeat;
        this.endBeat = endBeat;
        this.hitCount = 0;
        this.state = "waiting";
    }
    updateRoll(currentBeat) {
        if (this.state === "finished")
            return;
        if (currentBeat >= this.startBeat && currentBeat <= this.endBeat) {
            this.state = "active";
            return;
        }
        if (currentBeat > this.endBeat) {
            this.state = "finished";
        }
    }
    tryHit(action) {
        if (this.state !== "active")
            return null;
        if (action !== this.action)
            return null;
        this.hitCount++;
        return "roll-hit";
    }
    getExpireBeat() {
        return this.endBeat;
    }
    get numberOfHits() {
        return this.hitCount;
    }
    get rollState() {
        return this.state;
    }
    get isActive() {
        return this.state === "active";
    }
    get isFinished() {
        return this.state === "finished";
    }
}
//# sourceMappingURL=Note.js.map