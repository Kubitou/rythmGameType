import { RenderConfig } from "./RenderConfig.js";
export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.GAME_WIDTH = RenderConfig.GAME_WIDTH;
        this.GAME_HEIGHT = RenderConfig.GAME_HEIGHT;
        this.HIT_X = RenderConfig.HIT_X;
        this.HIT_Y = this.GAME_HEIGHT / 2;
        this.scrollSpeed = RenderConfig.SCROLL_SPEED;
        this.scaleX = 1;
        this.scaleY = 1;
        this.cameraBeat = 0;
        this.ctx = canvas.getContext("2d");
        this.resize();
        window.addEventListener("resize", () => this.resize());
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.scaleX = this.canvas.width / this.GAME_WIDTH;
        this.scaleY = this.canvas.height / this.GAME_HEIGHT;
    }
    getNoteX(noteBeat) {
        return this.HIT_X + (noteBeat - this.cameraBeat) * this.scrollSpeed;
    }
    render(game) {
        this.cameraBeat = game.getCurrentBeat();
        this.clear();
        switch (game.getState()) {
            case "idle":
                this.drawBackground();
                this.drawTitle();
                break;
            case "countdown":
                this.drawGameplay(game);
                this.drawCountdown(game);
                break;
            case "playing":
                this.drawGameplay(game);
                break;
            case "paused":
                this.drawGameplay(game);
                this.drawPauseMenu();
                break;
            case "results":
                this.drawGameplay(game);
                this.drawResults(game);
                break;
        }
    }
    drawGameplay(game) {
        this.drawHitLine();
        this.drawNotes(game);
        this.drawHud(game);
        this.drawDebug(game);
    }
    drawTitle() {
        this.ctx.fillStyle = "red";
        this.ctx.font = "40px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Taiko Game", this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Pressione espaço para começar", this.canvas.width / 2, this.canvas.height / 2 + 50);
        this.ctx.fillText("F = DON (vermelho) | J = Katsu (azul) ", this.canvas.width / 2, this.canvas.height / 2 + 80);
    }
    drawCountdown(game) {
        const countdown = game.getCountdown();
        this.ctx.fillStyle = "red";
        this.ctx.font = "40px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(countdown.toString(), this.canvas.width / 2, this.canvas.height / 2);
    }
    drawPauseMenu() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "red";
        this.ctx.font = "40px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Paused", this.canvas.width / 2, this.canvas.height / 2);
    }
    drawResults(game) {
        const hud = game.getHudData();
        this.ctx.fillStyle = "red";
        this.ctx.font = "40px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Final Score: ${hud.score}`, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.fillText(`Max Combo: ${hud.combo}`, this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawBackground() {
        // depois
    }
    drawHitLine() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.HIT_X * this.scaleX, this.HIT_Y * this.scaleY - 45 * this.scaleY, 10 * this.scaleX, 90 * this.scaleY);
    }
    drawNotes(game) {
        for (const note of game.getRenderNotes()) {
            if (note.kind === "roll") {
                this.drawRoll(note);
                continue;
            }
            this.drawTap(note);
        }
    }
    drawTap(note) {
        const x = this.getNoteX(note.beat);
        this.ctx.fillStyle =
            note.action === "DON"
                ? "red"
                : "blue";
        this.ctx.beginPath();
        this.ctx.arc(x * this.scaleX, this.HIT_Y * this.scaleY, 20 * this.scaleX, 0, Math.PI * 2);
        this.ctx.fill();
    }
    drawRoll(note) {
        const startX = this.getNoteX(note.startBeat);
        const endX = this.getNoteX(note.endBeat);
        this.ctx.fillStyle = "orange";
        this.ctx.fillRect(startX * this.scaleX, (this.HIT_Y - 10) * this.scaleY, (endX - startX) * this.scaleX, 20 * this.scaleY);
        this.ctx.beginPath();
        this.ctx.arc(startX * this.scaleX, this.HIT_Y * this.scaleY, 25 * this.scaleX, 0, Math.PI * 2);
        this.ctx.fill();
    }
    drawHud(game) {
        var _a;
        const hud = game.getHudData();
        this.ctx.fillStyle = "Red";
        this.ctx.textAlign = "center";
        this.ctx.font = "40px Arial";
        this.ctx.fillText((_a = hud.lastJudment) !== null && _a !== void 0 ? _a : "", this.canvas.width / 2, 130);
        this.ctx.fillText(`Combo ${hud.combo}`, this.canvas.width / 2, 190);
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Score ${hud.score}`, this.canvas.width / 2, 220);
    }
    drawDebug(game) {
        // FPS
        // Beat
        // Latência
        // etc.
    }
}
//# sourceMappingURL=Renderer.js.map