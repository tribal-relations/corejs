import TurnResult from './turn-result'
import type Turn from '../domain/entity/turn'
import Action from '../domain/entity/Action'
import { singleton } from 'tsyringe'
import Std from '../ui/std'
import ActionPerformer from './action-performer'

@singleton()
class TurnDecisionManager {
    constructor(
        private readonly _std: Std,
        private readonly _actionPerformer: ActionPerformer,
    ) {
    }

    public processTurn(action: Action, nextTurn: Turn): TurnResult {
        if (action.name === Action.quit) {
            return new TurnResult(true, true)
        }
        const actionResult = this.performAction(action, nextTurn)

        if (action.name === Action.conquer && actionResult) {
            return new TurnResult(true, true)
        }

        return new TurnResult(false, true)
    }

    private performAction(action: Action, nextTurn: Turn): boolean {
        return this._actionPerformer.performAction(action, nextTurn)
    }
}

export default TurnDecisionManager
