import { Game } from "../engine/Game";

export class PlayerInput{
    constructor(private game: Game){}  
    
    handleKey(code: string){
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