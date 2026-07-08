import { HitEvent } from "../core/HitEvent.js";

export class ScoreManager{
    private perfect = 0;
    private good = 0;
    private bad = 0;
    private miss = 0;
    private rollHits = 0;

    private score = 0;

    register(event: HitEvent){
        switch(event.type){
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
                this.rollHits++
                this.score += 10;
                break;
        }
    }

    get getScore(){
        return this.score;
    }
}