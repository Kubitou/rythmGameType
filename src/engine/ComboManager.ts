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
    if (this.combo > 0) {
    }
        this.combo = 0;
    }

    get getCurrentCombo(){
        return this.combo;
    }

    get getMaxCombo(){
        return this.maxCombo;
    }


}