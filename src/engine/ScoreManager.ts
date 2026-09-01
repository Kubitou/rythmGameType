import { HitEvent } from "../core/HitEvent.js";

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

  register(event: HitEvent) {
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
