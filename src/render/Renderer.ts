import { RenderConfig } from "./RenderConfig.js";
import { Game } from "../engine/Game.js";

export class Renderer {
  private ctx: CanvasRenderingContext2D;

  private readonly GAME_WIDTH = RenderConfig.GAME_WIDTH;
  private readonly GAME_HEIGHT = RenderConfig.GAME_HEIGHT;

  private readonly HIT_X = RenderConfig.HIT_X;
  private readonly HIT_Y = this.GAME_HEIGHT / 2;
  private readonly scrollSpeed = RenderConfig.SCROLL_SPEED;

  private scaleX = 1;
  private scaleY = 1;

  private cameraBeat = 0;

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

  private getNoteX(noteBeat: number) {
    return this.HIT_X + (noteBeat - this.cameraBeat) * this.scrollSpeed;
  }

  public render(game: Game) {
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
        this.drawResults(game);
        break;
    }
  }

  private drawGameplay(game: Game) {
    this.drawHitLine();

    this.drawNotes(game);

    this.drawHud(game);

    this.drawDebug(game);
  }

  private drawTitle() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "40px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Taiko Game",
      this.canvas.width / 2,
      this.canvas.height / 2,
    );
    this.ctx.font = "20px Arial";
    this.ctx.fillText(
      "Pressione espaço para começar",
      this.canvas.width / 2,
      this.canvas.height / 2 + 50,
    );
    this.ctx.fillText(
      "F = DON (vermelho) | J = Katsu (azul) ",
      this.canvas.width / 2,
      this.canvas.height / 2 + 80,
    );
  }

  private drawCountdown(game: Game) {
    const countdown = game.getCountdown();
    this.ctx.fillStyle = "red";
    this.ctx.font = "40px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      countdown.toString(),
      this.canvas.width / 2,
      this.canvas.height / 2,
    );
  }

  private drawPauseMenu() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "red";
    this.ctx.font = "40px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Paused", this.canvas.width / 2, this.canvas.height / 2);
  }

  private drawResults(game: Game) {
    this.clear();
    const results = game.getResultsData();

    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";

    this.ctx.font = "50px Arial";
    this.ctx.fillText("RESULTS", this.canvas.width / 2, 100);

    this.ctx.font = "25px Arial";

    this.ctx.fillText(`Rank: ${game.getRank()}`, this.canvas.width / 2, 140);

    this.ctx.fillText(`Score: ${results.score}`, this.canvas.width / 2, 175);

    this.ctx.fillText(
      `Perfect: ${results.perfect}`,
      this.canvas.width / 2,
      210,
    );

    this.ctx.fillText(`Good: ${results.good}`, this.canvas.width / 2, 250);

    this.ctx.fillText(`Bad: ${results.bad}`, this.canvas.width / 2, 290);

    this.ctx.fillText(`Miss: ${results.miss}`, this.canvas.width / 2, 330);

    this.ctx.fillText(
      `Roll Hits: ${results.rollHits}`,
      this.canvas.width / 2,
      370,
    );

    this.ctx.fillText(
      `Max Combo: ${results.maxCombo}`,
      this.canvas.width / 2,
      420,
    );
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawBackground() {
    // depois
  }

  private drawHitLine() {
    this.ctx.fillStyle = "red";

    this.ctx.fillRect(
      this.HIT_X * this.scaleX,
      this.HIT_Y * this.scaleY - 45 * this.scaleY,
      10 * this.scaleX,
      90 * this.scaleY,
    );
  }

  private drawNotes(game: Game) {
    for (const note of game.getRenderNotes()) {
      if (note.kind === "roll") {
        this.drawRoll(note);
        continue;
      }

      this.drawTap(note);
    }
  }

  private drawTap(note: ReturnType<Game["getRenderNotes"]>[number]) {
    const x = this.getNoteX(note.beat);
    const size = note.size === "big" ? 40 : 30;

    this.ctx.fillStyle = note.action === "DON" ? "red" : "blue";

    this.ctx.beginPath();

    this.ctx.arc(
      x * this.scaleX,
      this.HIT_Y * this.scaleY,
      size * this.scaleX,
      0,
      Math.PI * 2,
    );

    this.ctx.fill();
  }

  private drawRoll(note: ReturnType<Game["getRenderNotes"]>[number]) {
    const startX = this.getNoteX(note.startBeat!);
    const endX = this.getNoteX(note.endBeat!);

    this.ctx.fillStyle = "orange";

    this.ctx.fillRect(
      startX * this.scaleX,
      (this.HIT_Y - 10) * this.scaleY,
      (endX - startX) * this.scaleX,
      20 * this.scaleY,
    );

    this.ctx.beginPath();

    this.ctx.arc(
      startX * this.scaleX,
      this.HIT_Y * this.scaleY,
      40 * this.scaleX,
      0,
      Math.PI * 2,
    );

    this.ctx.fill();
  }

  private drawHud(game: Game) {
    const hud = game.getHudData();

    this.ctx.fillStyle = "Red";

    this.ctx.textAlign = "center";

    this.ctx.font = "40px Arial";

    this.ctx.fillText(hud.lastJudgment ?? "", this.canvas.width / 2, 130);

    this.ctx.fillText(`Combo ${hud.combo}`, this.canvas.width / 2, 190);

    this.ctx.font = "20px Arial";

    this.ctx.fillText(`Score ${hud.score}`, this.canvas.width / 2, 220);

    this.ctx.fillText(`X${hud.multiplier}`, this.canvas.width / 2 + 55 + hud.score.toString().length * 10, 220);
  }

  private drawDebug(game: Game) {
    // FPS
    // Beat
    // Latência
    // etc.
  }
}
