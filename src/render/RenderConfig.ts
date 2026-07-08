export const RenderConfig = {

    GAME_WIDTH:1280,
    GAME_HEIGHT:720,

    HIT_X:200,

    SCROLL_SPEED:300,

    get SPAWN_WINDOW_BEAT(){
        return (this.GAME_WIDTH - this.HIT_X)
            / this.SCROLL_SPEED;
    }
}

