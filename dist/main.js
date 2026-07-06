var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("MAIN CARREGOU");
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
const audioManager = new AudioManager("./assets/music/alienalien.mp3");
const beatSource = new AudioBeatSource(audioManager, chart.bpm, chart.offset);
const clock = new Clock();
const game = new Game(clock, chart, beatSource);
const canvas = document.getElementById("gameCanvas");
const renderer = new Renderer(canvas);
let started = false;
const input = new PlayerInput(game);
window.addEventListener("keydown", (e) => __awaiter(void 0, void 0, void 0, function* () {
    if (e.key === " ") {
        if (started)
            return;
        started = true;
        yield audioManager.play();
        game.start();
        console.log("START");
    }
    input.handleKey(e.code);
}));
let lastTime = performance.now();
console.log("notloop");
function loop(now) {
    console.log("loop");
    const dt = now - lastTime;
    lastTime = now;
    if (started) {
        console.log(beatSource.getBeat().toFixed(3), audioManager.getCurrentTime().toFixed(3));
        game.update(dt);
    }
    renderer.render(game);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
//# sourceMappingURL=main.js.map