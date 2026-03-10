"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboManager = void 0;
class ComboManager {
    combo = 0;
    maxCombo = 0;
    incrementCombo() {
        this.combo++;
        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }
    }
    resetCombo() {
        this.combo = 0;
    }
    get getCurrentCombo() {
        return this.combo;
    }
    get getMaxCombo() {
        return this.maxCombo;
    }
    get isFullCombo() {
        return this.combo > 0;
    }
}
exports.ComboManager = ComboManager;
//# sourceMappingURL=ComboManager.js.map