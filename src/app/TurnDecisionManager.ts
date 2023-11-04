import { singleton } from 'tsyringe'
import ActionPerformer from './ActionPerformer'
import TurnResult from './TurnResult'
import type Action from '../domain/entity/Action'
import type Turn from '../domain/entity/Turn'
import ActionName from '../domain/enum/ActionName'
import Std from '../ui/Std'

@singleton()
class TurnDecisionManager {
    constructor(
        private readonly _std: Std,
        private readonly _actionPerformer: ActionPerformer,
    ) {
    }

    public processTurn(action: Action, nextTurn: Turn): TurnResult {
        if (action.name === ActionName.quit) {
            return new TurnResult(true, true)
        }
        const actionResult = this.performAction(action, nextTurn)

        if (action.name === ActionName.conquer && actionResult) {
            return new TurnResult(true, true)
        }

        return new TurnResult(false, true)
    }

    private performAction(action: Action, nextTurn: Turn): boolean {
        return this._actionPerformer.performAction(action, nextTurn)
    }
}

export default TurnDecisionManager
