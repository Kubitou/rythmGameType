export class ScoreManager {
    constructor() {
        this.perfect = 0;
        this.good = 0;
        this.bad = 0;
        this.miss = 0;
        this.rollHits = 0;
        this.score = 0;
    }
    register(event) {
        switch (event.type) {
            case "perfect":
                this.perfect++;
                this.score += 300;
                break;
            case "good":
                this.good++;
                this.score += 100;
                break;
            case "bad":
                this.bad++;
                this.score += 10;
                break;
            case "miss":
                this.miss++;
                break;
            case "roll-hit":
                this.rollHits++;
                this.score += 10;
                break;
        }
    }
    get getScore() {
        return this.score;
    }
}
//# sourceMappingURL=ScoreManager.js.map