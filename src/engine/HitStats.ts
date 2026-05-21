import { HitEvent } from "../core/HitEvent.js";

export class HitStats{
    perfect = 0;
    good = 0;
    bad = 0;
    miss = 0;
    rollHits = 0;

    register(event: HitEvent){
        switch(event.type){
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
                this.rollHits++
                break;
        }
    }
}