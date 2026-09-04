export class ComboManager {
    constructor() {
        this.combo = 0;
        this.maxCombo = 0;
    }
    incrementCombo() {
        this.combo++;
        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }
    }
    resetCombo() {
        this.combo = 0;
    }
    resetAll() {
        this.combo = 0;
        this.maxCombo = 0;
    }
    get getCurrentCombo() {
        return this.combo;
    }
    get getMaxCombo() {
        return this.maxCombo;
    }
}
//# sourceMappingURL=ComboManager.js.map