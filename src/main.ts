import { Clock } from "./engine/Clock";
import { Game } from "./engine/Game";
import { Chart } from "./core/ChartTypes";

const chart: Chart = {
  bpm: 120,
  offset: 0,
  notes: [
    { beat: 2, action: "DON", size: "small" },

    {
      type: "roll",
      startBeat: 4,
      endBeat: 6,
      action: "DON",
      size: "small",
    },

    { beat: 8, action: "DON", size: "small" },
  ],
};

const clock = new Clock();
const game = new Game(clock, chart);

game.loadChart();

let lastTime = Date.now();
let spamInterval: NodeJS.Timeout | null = null;
let rollSpamStarted = false;
let rollSpamStopped = false;

setInterval(() => {
  const now = Date.now();
  const dt = now - lastTime;
  lastTime = now;

  game.update(dt);

  const beat = game.getCurrentBeat();

  // Hit tap em 2
  if (beat >= 2 && beat < 2.1) {
    console.log("Tap 2:", game.handleInput("DON"));
  }

  // Quando chegar perto do roll, começa spam
  if (!rollSpamStarted && beat >= 4) {
    rollSpamStarted = true;

    console.log("ROLL START SPAM");

    spamInterval = setInterval(() => {
      game.handleInput("DON");
    }, 50);
  }

  // Para spam depois do fim do roll

  if (rollSpamStarted && !rollSpamStopped && beat >= 6.2) {
    rollSpamStopped = true;
    if (spamInterval) clearInterval(spamInterval);
    console.log("ROLL END SPAM");
  }

  // Tap depois do roll
  if (beat >= 8 && beat < 8.1) {
    console.log("Tap 8:", game.handleInput("DON"));
  }
}, 16);
