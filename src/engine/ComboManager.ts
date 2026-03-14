export class ComboManager{
    private combo = 0;
    private maxCombo = 0;
    private missCount = 0;

    incrementCombo(){
        this.combo++;
        // console.log("COMBO:", this.combo);

        if(this.combo > this.maxCombo){
            this.maxCombo = this.combo;
        }
    }

    resetCombo(){
    if (this.combo > 0) {
        // console.log("COMBO BREAK");
    }
        this.combo = 0;
    }

    get getCurrentCombo(){
        return this.combo;
    }

    get getMaxCombo(){
        return this.maxCombo;
    }

    get isFullCombo(){
        return this.missCount === 0;
    }

}