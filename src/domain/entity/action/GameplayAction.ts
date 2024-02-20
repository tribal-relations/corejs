import type PlayerActionParameter from '../../../ui/common/PlayerActionParameter.ts'
import type ActionName from '../../enum/ActionName.ts'
import type EntityInterface from '../EntityInterface.ts'
import type GameAction from '../static/GameAction.ts'

class GameplayAction implements EntityInterface {
    Name: ActionName
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
