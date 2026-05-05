import { Game } from "../engine/Game.js";
import { TapNote, RollNote } from "../core/Note.js";

export class Renderer {
  private ctx: CanvasRenderingContext2D;

  private GAME_WIDTH = 1280;
  private GAME_HEIGHT = 720;

  private scaleX = 1;
  private scaleY = 1;

  private HIT_X = 200;
  private HIT_Y = this.GAME_HEIGHT / 2;

  private scrollSpeed = 300;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.scaleX = this.canvas.width / this.GAME_WIDTH;
    this.scaleY = this.canvas.height / this.GAME_HEIGHT;
  }

  private getNoteX(noteBeat: number, currentBeat: number) {
    return this.HIT_X + (noteBeat - currentBeat) * this.scrollSpeed;
  }

  render(game: Game) {
    const beat = game["timeEngine"].preciseBeat;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      this.HIT_X * this.scaleX,
      this.HIT_Y * this.scaleY,
      10,
      50,
    );

    // ⚠️ gambiarra controlada (depois melhora)
    const notes = (game as any).noteManager.getActiveNotes;

    for (const note of notes) {
      let noteBeat = 0;

      if (note instanceof TapNote) {
        noteBeat = note.hitBeat;
      } else if (note instanceof RollNote) {
        noteBeat = note.startBeat;
      }

      const x = this.getNoteX(noteBeat, beat);

      this.ctx.fillStyle = "blue";

      const delta = Math.abs(noteBeat - beat);

      if(delta < 0.15){
        this.ctx.fillStyle = "green"; // perfect window
      } else if(delta < 0.3){
        this.ctx.fillStyle = "yellow"; // good
      } else {
        this.ctx.fillStyle = "blue";
      }

      this.ctx.fillRect(
        x * this.scaleX,
        (this.HIT_Y - 20) * this.scaleY,
        40 * this.scaleX,
        40 * this.scaleY,
      );

      
    }
    // console.log("ACTIVE NOTES:", (game as any).noteManager.getActiveNotes.length);
  }
}
