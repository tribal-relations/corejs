import type GameplayAction from './GameplayAction'
import type PlayerActionInterface from './PlayerActionInterface'
import type Tribe from '../Tribe'

class AbstractPlayerAction implements PlayerActionInterface {
    constructor(
        private readonly _gameplayAction: GameplayAction,
        private readonly _actor: Tribe,
    ) {
    }

    get gameplayAction(): GameplayAction {
        return this._gameplayAction
    }

    get actor(): Tribe {
        return this._actor
    }
}

export default AbstractPlayerAction
