export class HitStats {
    constructor() {
        this.perfect = 0;
        this.good = 0;
        this.bad = 0;
        this.miss = 0;
        this.rollHits = 0;
    }
    register(event) {
        switch (event.type) {
            case "perfect":
                this.perfect++;
                break;
            case "good":
                this.good++;
                break;
            case "bad":
                this.bad++;
                break;
            case "miss":
                this.miss++;
                break;
            case "roll-hit":
                this.rollHits++;
                break;
        }
    }
}
//# sourceMappingURL=HitStats.js.map