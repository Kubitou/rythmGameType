var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Clock } from "./engine/Clock.js";
import { Game } from "./engine/Game.js";
import { Renderer } from "./render/Renderer.js";
import { AudioManager } from "./engine/AudioManager.js";
import { AudioBeatSource } from "./engine/AudioBeatSource.js";
import { PlayerInput } from "./core/PlayerInput.js";
const chart = {
    bpm: 120,
    offset: 6.56,
    notes: [
        { beat: 0, action: "DON", size: "big" },
        { beat: 0.70, action: "DON", size: "big" },
        { beat: 1.40, action: "DON", size: "big" },
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
        { beat: 14, action: "DON", size: "small" },
        { beat: 15, action: "DON", size: "small" },
        { beat: 16, action: "DON", size: "small" },
        { beat: 17, action: "DON", size: "small" },
    ],
};
const audioManager = new AudioManager("./assets/music/alienalien.mp3");
const beatSource = new AudioBeatSource(audioManager, chart.bpm, chart.offset);
const clock = new Clock();
const game = new Game(clock, chart, beatSource);
const renderer = new Renderer(document.getElementById("gameCanvas"));
const input = new PlayerInput(game);
let started = false;
let musicStarted = false;
window.addEventListener("keydown", (e) => __awaiter(void 0, void 0, void 0, function* () {
    switch (e.code) {
        case "Space":
            if (game.getState() === "results") {
                resetGame();
                return;
            }
            if (!started) {
                started = true;
                game.start();
            }
            break;
        case "Escape":
            if (game.getState() === "playing") {
                game.pause();
                audioManager.pause();
            }
            else if (game.getState() === "paused") {
                game.resume();
                yield audioManager.play();
            }
            break;
        case "Digit4":
            game.finish();
            break;
    }
    input.handleKey(e.code);
}));
function resetGame() {
    game.resetGame();
    audioManager.resetAudio();
    started = false;
    musicStarted = false;
}
let lastTime = performance.now();
function loop(now) {
    const dt = now - lastTime;
    lastTime = now;
    if (started) {
        game.update(dt);
        if (!musicStarted &&
            game.getState() === "playing") {
            musicStarted = true;
            audioManager.play();
        }
        if (musicStarted &&
            audioManager.getCurrentTime() >= audioManager.getDuration()) {
            game.finish();
        }
    }
    renderer.render(game);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
//# sourceMappingURL=main.js.map