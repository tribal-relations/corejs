import Player from "./player";

class Turn {
    constructor(
        private _player: Player,
        private _isLast: boolean = false,
        private _isFinished: boolean = false,
    ) {
    }

    get player(): Player {
        return this._player
    }

    get isLast(): boolean {
        return this._isLast
    }

    get isFinished(): boolean {
        return this._isFinished
    }
}

export default Turn
