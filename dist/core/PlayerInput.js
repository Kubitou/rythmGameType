"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerInput = void 0;
class PlayerInput {
    onInput;
    constructor(onInput) {
        this.onInput = onInput;
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding("utf8");
        process.stdin.on("data", (key) => {
            if (key === "d")
                this.onInput("DON");
            if (key === "k")
                this.onInput("KATSU");
            if (key === "\u0003")
                process.exit();
        });
    }
}
exports.PlayerInput = PlayerInput;
//# sourceMappingURL=PlayerInput.js.map