"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitStats = void 0;
class HitStats {
    perfect = 0;
    good = 0;
    bad = 0;
    miss = 0;
    rollHits = 0;
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
exports.HitStats = HitStats;
//# sourceMappingURL=HitStats.js.map