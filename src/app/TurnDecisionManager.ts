import type ActionPerformer from './ActionPerformer.ts'
import TurnResult from './TurnResult.ts'
import type PlayerActionInterface from '../domain/entity/action/PlayerActionInterface'
import type Turn from '../domain/entity/Turn.ts'
import ActionName from '../domain/enum/ActionName.ts'

class TurnDecisionManager {
    constructor(
        private readonly _actionPerformer: ActionPerformer,
    ) {
    }

    public processTurn(action: PlayerActionInterface, nextTurn: Turn): TurnResult {
        if (action.gameAction.name === ActionName.Quit) {
            return new TurnResult(true, true, true)
        }
        const actionResult = this.performAction(action, nextTurn)

        if (action.gameAction.name === ActionName.Conquer && actionResult) {
            return new TurnResult(true, true, true)
        }

        return new TurnResult(false, true, actionResult)
    }

    private performAction(action: PlayerActionInterface, nextTurn: Turn): boolean {
        return this._actionPerformer.performAction(action, nextTurn)
    }
}

export default TurnDecisionManager
