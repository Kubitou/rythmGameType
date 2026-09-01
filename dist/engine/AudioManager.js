var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AudioManager {
    constructor(path) {
        this.audio = new Audio(path);
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.audio.play();
        });
    }
    pause() {
        this.audio.pause();
    }
    resetAudio() {
        this.audio.currentTime = 0;
    }
    getCurrentTime() {
        return this.audio.currentTime;
    }
    getDuration() {
        return this.audio.duration;
    }
}
//# sourceMappingURL=AudioManager.js.map