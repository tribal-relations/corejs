import type PlayerActionInterface from './action/PlayerActionInterface'
import type Player from './Player.ts'

class Turn {
    parameters: string = ''

    constructor(
        private readonly _player: Player,
        private readonly _isLast: boolean = false,
        private readonly _isFinished: boolean = false,
        private _action: PlayerActionInterface | null = null,
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

    get action(): PlayerActionInterface | null {
        return this._action
    }

    set action(action: PlayerActionInterface) {
        this._action = action
    }
}

export default Turn
