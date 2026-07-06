export class PlayerInput {
    constructor(game) {
        this.game = game;
    }
    handleKey(code) {
        switch (code) {
            case "KeyF":
                this.game.handleInput("DON");
                break;
            case "KeyJ":
                this.game.handleInput("KATSU");
                break;
        }
    }
}
//# sourceMappingURL=PlayerInput.js.map