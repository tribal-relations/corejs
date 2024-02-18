import type GameplayAction from './GameplayAction.ts'
import type PlayerActionInterface from './PlayerActionInterface.ts'
import type Tribe from '../Tribe.ts'

class AbstractPlayerAction implements PlayerActionInterface {
    gameplayActionName = this._gameplayAction.name
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
