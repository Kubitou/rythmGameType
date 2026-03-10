export class ComboManager{
    private combo = 0;
    private maxCombo = 0;
    

    incrementCombo(){
        this.combo++;

        if(this.combo > this.maxCombo){
            this.maxCombo = this.combo;
        }
    }

    resetCombo(){
        this.combo = 0;
    }

    get getCurrentCombo(){
        return this.combo;
    }

    get getMaxCombo(){
        return this.maxCombo;
    }

    get isFullCombo(){
        return this.combo > 0;
    }

}