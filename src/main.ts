import { Clock } from "./engine/Clock.js";
import { Game } from "./engine/Game.js";
import { Chart } from "./core/ChartTypes.js";
import { Renderer } from "./render/Renderer.js";
import { AudioManager } from "./engine/AudioManager.js";
import { AudioBeatSource } from "./engine/AudioBeatSource.js";

const chart: Chart = {
  bpm: 120,
  offset: 0,

  notes: [
    { beat: 2, action: "DON", size: "small" },

    {
      type: "roll",
      startBeat: 4,
      endBeat: 10,
      action: "DON",
      size: "small",
    },

    { beat: 11, action: "KATSU", size: "small" },
    { beat: 13, action: "DON", size: "small" },
  ],
};

const audioManager = new AudioManager(
  "./assets/music/alienalien.mp3", 120, 0
);

const beatSource = new AudioBeatSource(
  audioManager,
  chart.bpm,
  chart.offset
);

const clock = new Clock();

const game = new Game(
  clock,
  chart,
  beatSource
);

const canvas = document.getElementById(
  "gameCanvas"
) as HTMLCanvasElement;

const renderer = new Renderer(canvas);

let started = false;

window.addEventListener("keydown", async (e) => {

  if (e.key === " ") {

    if (started) return;

    started = true;

    game.start();

    await audioManager.play();

    console.log("START");
  }

  if (e.key === "f") {
    console.log(
      "DON:",
      game.handleInput("DON")
    );
  }

  if (e.key === "j") {
    console.log(
      "KATSU:",
      game.handleInput("KATSU")
    );
  }
});

let lastTime = performance.now();

function loop(now: number) {

  const dt = now - lastTime;
  lastTime = now;

  game.update(dt);

  renderer.render(game);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);