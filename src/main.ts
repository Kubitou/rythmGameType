console.log("MAIN CARREGOU");
import { Clock } from "./engine/Clock.js";
import { Game } from "./engine/Game.js";
import { Chart } from "./core/ChartTypes.js";
import { Renderer } from "./render/Renderer.js";
import { AudioManager } from "./engine/AudioManager.js";
import { AudioBeatSource } from "./engine/AudioBeatSource.js";
import { PlayerInput } from "./core/PlayerInput.js";

const chart: Chart = {
  bpm: 120,
  offset: 6.56,

  notes: [
    { beat: 0, action: "DON", size: "small" },
    { beat: 0.70, action: "DON", size: "small" },
    { beat: 1.40, action: "DON", size: "small" },
    { beat: 2.10, action: "DON", size: "small" },
    { beat: 2.80, action: "DON", size: "small" },
    { beat: 3.50, action: "DON", size: "small" },

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
  "./assets/music/alienalien.mp3"
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
const input = new PlayerInput(game);

window.addEventListener("keydown", async (e) => {

  if (e.key === " ") {

    if (started) return;

    started = true;

    await audioManager.play();
    game.start();

    console.log("START");
  }

  input.handleKey(e.code);
});

let lastTime = performance.now();

  console.log("notloop");

function loop(now: number) {

  console.log("loop");

  const dt = now - lastTime;
  lastTime = now;

  if(started){
    console.log(
        beatSource.getBeat().toFixed(3),
        audioManager.getCurrentTime().toFixed(3)
    );
    game.update(dt);
  }

  renderer.render(game);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);