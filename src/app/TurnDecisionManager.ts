import type ActionPerformer from './ActionPerformer.ts'
import TurnResult from './TurnResult.ts'
import type Action from '../domain/entity/Action.ts'
import type Turn from '../domain/entity/Turn.ts'
import ActionName from '../domain/enum/ActionName.ts'

class TurnDecisionManager {
    constructor(
        private readonly _actionPerformer: ActionPerformer,
    ) {
    }

    public processTurn(action: Action, nextTurn: Turn): TurnResult {
        if (action.name === ActionName.Quit) {
            return new TurnResult(true, true, true)
        }
        const actionResult = this.performAction(action, nextTurn)

        if (action.name === ActionName.Conquer && actionResult) {
            return new TurnResult(true, true, true)
        }

        return new TurnResult(false, true, actionResult)
    }

    private performAction(action: Action, nextTurn: Turn): boolean {
        return this._actionPerformer.performAction(action, nextTurn)
    }
}

export default TurnDecisionManager
