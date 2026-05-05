export type InputAction = "DON" | "KATSU";

export class PlayerInput{
    constructor(private onInput: (action: InputAction) => void){
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding("utf8");

        process.stdin.on("data", (key: string) => {
            if(key === "d") this.onInput("DON");
            if(key === "k") this.onInput("KATSU");

            if(key === "\u0003") process.exit();
        });
    }
}