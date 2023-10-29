import type Player from './player'

class Turn {
    constructor(
        private readonly _player: Player,
        private readonly _isLast: boolean = false,
        private readonly _isFinished: boolean = false,
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
