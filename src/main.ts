import { Clock } from "./engine/Clock";
import { Game } from "./engine/Game";
import { Chart } from "./core/ChartTypes";

const clock = new Clock();
const game = new Game(clock);

const testChart: Chart = {
  bpm: 120,
  offset: 0,
  notes: [
        { beat: 0, action: "DON", size: "small" },
        { beat: 1, action: "KATSU", size: "small" },
        { beat: 2, action: "DON", size: "small" },
        { beat: 4, action: "DON", size: "small" },
        { beat: 5, action: "KATSU", size: "small" },
        { beat: 6, action: "DON", size: "small" },
        { beat: 8, action: "DON", size: "small" },
        { beat: 9, action: "KATSU", size: "small" },
        { beat: 10, action: "DON", size: "small" },
        { beat: 12, action: "DON", size: "small" },
        { beat: 13, action: "KATSU", size: "small" },
        { beat: 14, action: "DON", size: "small" },
    ]
};

game.loadChart(testChart);

let lastTime = Date.now();

const interval = setInterval(() => {
  const now = Date.now();
  const dt = now - lastTime;
  lastTime = now;

  game.update(dt);

  console.clear();
  console.log("  ");
  console.log("Upcoming:", game.getUpcomingNotes().map(n => n.hitTime));
  console.log("Active:", game.getActiveNotes().map(n => n.hitTime));
  console.log("Tempo:", game.time);

  // parar após 8 segundos
  if (game.time > 8000) {
    clearInterval(interval);
    console.log("Simulação encerrada.");
  }

}, 1000);
