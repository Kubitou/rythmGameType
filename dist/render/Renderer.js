import { TapNote, RollNote } from "../core/Note.js";
export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.GAME_WIDTH = 1280;
        this.GAME_HEIGHT = 720;
        this.scaleX = 1;
        this.scaleY = 1;
        this.HIT_X = 200;
        this.HIT_Y = this.GAME_HEIGHT / 2;
        this.scrollSpeed = 300;
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
    getNoteX(noteBeat, currentBeat) {
        return this.HIT_X + (noteBeat - currentBeat) * this.scrollSpeed;
    }
    render(game) {
        const beat = game["timeEngine"].preciseBeat;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.HIT_X * this.scaleX, this.HIT_Y * this.scaleY, 10, 50);
        // ⚠️ gambiarra controlada (depois melhora)
        const notes = game.noteManager.getActiveNotes;
        for (const note of notes) {
            let noteBeat = 0;
            if (note instanceof TapNote) {
                noteBeat = note.hitBeat;
            }
            else if (note instanceof RollNote) {
                noteBeat = note.startBeat;
            }
            const x = this.getNoteX(noteBeat, beat);
            this.ctx.fillStyle = "blue";
            const delta = Math.abs(noteBeat - beat);
            if (delta < 0.15) {
                this.ctx.fillStyle = "green"; // perfect window
            }
            else if (delta < 0.3) {
                this.ctx.fillStyle = "yellow"; // good
            }
            else {
                this.ctx.fillStyle = "blue";
            }
            this.ctx.fillRect(x * this.scaleX, (this.HIT_Y - 20) * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);
        }
        // console.log("ACTIVE NOTES:", (game as any).noteManager.getActiveNotes.length);
    }
}
//# sourceMappingURL=Renderer.js.map