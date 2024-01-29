import type Player from './Player.ts'
import type RelationsAction from './RelationsAction.ts'

class RelationsTurn {
    parameters: string = ''

    constructor(
        private readonly _player: Player,
        private readonly _isLast: boolean = false,
        private readonly _isFinished: boolean = false,
        private _action: RelationsAction | null = null,
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

    get action(): RelationsAction | null {
        return this._action
    }

    set action(action: RelationsAction) {
        this._action = action
    }
}

export default RelationsTurn
