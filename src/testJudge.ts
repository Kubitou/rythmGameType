import { ComboManager } from "./engine/ComboManager.js";
const combo = new ComboManager();

combo.incrementCombo();
combo.incrementCombo();
combo.incrementCombo();

console.log(
  combo.getCurrentCombo === 3
    ? "PASS  combo → 3"
    : `FAIL  combo → ${combo.getCurrentCombo}`
);

combo.resetCombo();

console.log(
  combo.getCurrentCombo === 0 && combo.getMaxCombo === 3
    ? "PASS  reset combo mantém maxCombo"
    : "FAIL  reset combo"
);

combo.resetAll();

console.log(
  combo.getCurrentCombo === 0 && combo.getMaxCombo === 0
    ? "PASS  resetAll"
    : "FAIL  resetAll"
);