import { Clock } from "./engine/Clock";
import { Game } from "./engine/Game";
import { Chart } from "./core/ChartTypes";

const testChart: Chart = {
    bpm: 120,
    offset: 0,
    notes: [
        { beat: 0, action: "DON", size: "small" },
        { beat: 1, action: "KATSU", size: "small" },
        { beat: 2, action: "DON", size: "small" },
        { beat: 4, action: "DON", size: "small" },
        { beat: 5.5, action: "KATSU", size: "small" },
        { beat: 6, action: "DON", size: "small" },
        { beat: 8, action: "DON", size: "small" },
        { beat: 9, action: "KATSU", size: "small" },
        { beat: 10, action: "DON", size: "small" },
        { beat: 12, action: "DON", size: "small" },
        { beat: 13, action: "KATSU", size: "small" },
        { beat: 14, action: "DON", size: "small" },
    ]
};

const clock = new Clock();
const game = new Game(clock, testChart);

game.loadChart();

let lastTime = Date.now();

setInterval(() => {
    const now = Date.now();
    const dt = now - lastTime;
    lastTime = now;

    game.update(dt);

}, 16); // ~60 FPS