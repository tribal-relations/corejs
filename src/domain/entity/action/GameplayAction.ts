import type PlayerActionParameter from '../../../ui/common/PlayerActionParameter'
import type ActionName from '../../enum/ActionName'
import type GameAction from '../GameAction'

class GameplayAction {
    constructor(
        private readonly _gameAction: GameAction,
        private readonly _parameters: PlayerActionParameter[],
    ) {
    }

    get name(): ActionName {
        return this._gameAction.name
    }

    get description(): string {
        return this._gameAction.description
    }

    get gameAction(): GameAction {
        return this._gameAction
    }

    get parameters(): PlayerActionParameter[] {
        return this._parameters
    }
}

export default GameplayAction
