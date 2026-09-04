import { HitEvent } from "../core/HitEvent.js";
import { ComboManager } from "./ComboManager.js";

export type ScoreData = {
  score: number;
  perfect: number;
  good: number;
  bad: number;
  miss: number;
  rollHits: number;
};

export class ScoreManager {
  private perfect = 0;
  private good = 0;
  private bad = 0;
  private miss = 0;
  private rollHits = 0;

  private score = 0;

  constructor(private comboManager: ComboManager) {}

  register(event: HitEvent) {
    let multiplier = this.multiplier();
    switch (event.type) {
      case "perfect":
        this.perfect++;
        this.score += 300 * multiplier;
        break;

      case "good":
        this.good++;
        this.score += 100 * multiplier;
        break;

      case "bad":
        this.bad++;
        this.score += 10 * multiplier;
        break;

      case "miss":
        this.miss++;
        break;

      case "roll-hit":
        this.rollHits++;
        this.score += 10 * multiplier;
        break;
    }
  }

  multiplier(){
    let combo = this.comboManager.getCurrentCombo;
    if(combo >= 30){
      return 4;
    }else if(combo >= 20){
      return 3;
    }else if(combo >= 10){
      return 2;
    }else{
      return 1;
    }
  }

  resetScore() {
    this.perfect = 0;
    this.good = 0;
    this.bad = 0;
    this.miss = 0;
    this.rollHits = 0;
    this.score = 0;
  }

  get getScore() {
    return this.score;
  }

  getStats(): ScoreData {
    return {
      score: this.score,
      perfect: this.perfect,
      good: this.good,
      bad: this.bad,
      miss: this.miss,
      rollHits: this.rollHits,
    };
  }
}
