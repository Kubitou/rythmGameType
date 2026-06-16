import { Game } from "../engine/Game.js";

type HitFeedback = {
  text: string;
  remainingTime: number;
}

export class Renderer {
  private ctx: CanvasRenderingContext2D;

  private GAME_WIDTH = 1280;
  private GAME_HEIGHT = 720;

  private scaleX = 1;
  private scaleY = 1;

  private HIT_X = 200;
  private HIT_Y = this.GAME_HEIGHT / 2;

  private scrollSpeed = 300;

  private cameraBeat = 0;

  private feedBack: HitFeedback | null = null;

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
    this.cameraBeat = game.getCurrentBeat();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      this.HIT_X * this.scaleX,
      this.HIT_Y * this.scaleY - 45 * this.scaleY,
      10 * this.scaleX,
      90 * this.scaleY,
    );

    const notes = game.getRenderNotes();

    for (const note of notes) {
      if (note.kind === "roll") {
        const startX = this.getNoteX(note.startBeat!, this.cameraBeat);
        const endX = this.getNoteX(note.endBeat!, this.cameraBeat);

        this.ctx.fillStyle = "orange";

        this.ctx.fillRect(
          startX * this.scaleX,
          (this.HIT_Y - 10) * this.scaleY,
          (endX - startX) * this.scaleX,
          20 * this.scaleY
        );

        this.ctx.beginPath();
        this.ctx.arc(
          startX * this.scaleX,
          this.HIT_Y * this.scaleY,
          25 * this.scaleX,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        continue;
      }
      const noteBeat = note.beat;

      const x = this.getNoteX(noteBeat, this.cameraBeat);

      if (note.action === "DON") {
        this.ctx.fillStyle = "red";
      }
      if (note.action === "KATSU") {
        this.ctx.fillStyle = "blue";
      }

      // const delta = Math.abs(noteBeat - this.cameraBeat);

      // if(delta < 0.15){
      //   this.ctx.fillStyle = "green"; // perfect window
      // } else if(delta < 0.3){
      //   this.ctx.fillStyle = "yellow"; // good
      // } else {
      //   this.ctx.fillStyle = "blue";
      // }

      this.ctx.beginPath();
      this.ctx.arc(
        x * this.scaleX,
        this.HIT_Y * this.scaleY,
        20 * this.scaleX,
        0,
        Math.PI * 2
      );
      this.ctx.fill();


    }
    // console.log("ACTIVE NOTES:", (game as any).noteManager.getActiveNotes.length);
  }
}
