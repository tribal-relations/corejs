import type PlayerActionInterface from './PlayerActionInterface'
import type GameAction from '../GameAction'
import type Tribe from '../Tribe'

class AbstractPlayerAction implements PlayerActionInterface {
    constructor(
        private readonly _gameAction: GameAction,
        private readonly _actor: Tribe,
    ) {
    }

    get gameAction(): GameAction {
        return this._gameAction
    }

    get actor(): Tribe {
        return this._actor
    }
}

export default AbstractPlayerAction
