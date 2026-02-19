"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clock_1 = require("./engine/Clock");
const Game_1 = require("./engine/Game");
const Metronome_1 = require("./engine/Metronome");
const testChart = {
    bpm: 120,
    offset: 0,
    notes: [
        { beat: 0, action: "DON", size: "small" },
        { beat: 1, action: "KATSU", size: "small" },
        { beat: 2, action: "DON", size: "small" },
        { beat: 4, action: "DON", size: "small" },
    ]
};
const clock = new Clock_1.Clock();
const game = new Game_1.Game(clock, testChart);
// 👇 instanciando metrônomo separado
const metronome = new Metronome_1.Metronome(clock, testChart.bpm, 4);
game.loadChart();
let lastTime = Date.now();
const interval = setInterval(() => {
    const now = Date.now();
    const dt = now - lastTime;
    lastTime = now;
    game.update(dt);
    const beatChanged = metronome.update();
    console.log("Tempo:", game.time);
    if (beatChanged !== null) {
        console.log("Beat:", beatChanged);
        console.log("Measure:", metronome.currentMeasure);
    }
    if (game.time > 8000) {
        clearInterval(interval);
        console.log("Simulação encerrada.");
    }
}, 100); // 👈 100ms deixa mais realista
//# sourceMappingURL=main.js.map