"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clock_1 = require("./engine/Clock");
const Game_1 = require("./engine/Game");
const chart = {
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
        { beat: 10, action: "DON", size: "small" },
    ],
};
const clock = new Clock_1.Clock();
const game = new Game_1.Game(clock, chart);
game.loadChart();
let lastTime = Date.now();
let tap2Hit = false;
let tap10Hit = false;
let spamInterval = null;
let rollSpamStarted = false;
let rollSpamStopped = false;
setInterval(() => {
    const now = Date.now();
    const dt = now - lastTime;
    lastTime = now;
    game.update(dt);
    const beat = game.getCurrentBeat();
    // Tap no beat 2
    if (!tap2Hit && beat >= 2) {
        tap2Hit = true;
        console.log("Tap 2:", game.handleInput("DON"));
    }
    // Começa spam do roll
    if (!rollSpamStarted && beat >= 4) {
        rollSpamStarted = true;
        console.log("ROLL START SPAM");
        spamInterval = setInterval(() => {
            const result = game.handleInput("DON");
            if (result === "roll-hit") {
                console.log("roll-hit");
            }
        }, 50);
    }
    // Para spam
    if (rollSpamStarted && !rollSpamStopped && beat >= 6.2) {
        rollSpamStopped = true;
        if (spamInterval)
            clearInterval(spamInterval);
        console.log("ROLL END SPAM");
    }
    // NÃO vamos clicar no tap 8 (testar auto miss)
    // Novo tap depois do miss
    if (!tap10Hit && beat >= 10) {
        tap10Hit = true;
        console.log("Tap 10:", game.handleInput("DON"));
    }
}, 16);
//# sourceMappingURL=main.js.map