"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clock_1 = require("./engine/Clock");
const Game_1 = require("./engine/Game");
const chart = {
    bpm: 120,
    offset: 0,
    notes: [
        { type: "tap", beat: 2, action: "DON", size: "small" },
        { type: "tap", beat: 4, action: "KATSU", size: "small" },
        { type: "tap", beat: 6, action: "DON", size: "small" }
    ]
};
const clock = new Clock_1.Clock();
const game = new Game_1.Game(clock, chart);
game.loadChart();
let lastTime = Date.now();
let hit2 = false;
let hit4 = false;
let hit6 = false;
setInterval(() => {
    const now = Date.now();
    const dt = now - lastTime;
    lastTime = now;
    game.update(dt);
    const beat = game.getCurrentBeat();
    if (!hit2 && beat >= 2.05) {
        hit2 = true;
        console.log("Hit result:", game.handleInput("DON"));
    }
    if (!hit4 && beat >= 4.0) {
        hit4 = true;
        console.log("Hit result:", game.handleInput("KATSU"));
    }
    if (!hit6 && beat >= 5.8) {
        hit6 = true;
        console.log("Hit result:", game.handleInput("DON"));
    }
}, 16);
//# sourceMappingURL=main.js.map