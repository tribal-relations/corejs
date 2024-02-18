import type ActionPerformer from './ActionPerformer.ts'
import TurnResult from './TurnResult.ts'
import type PlayerActionInterface from '../domain/entity/action/PlayerActionInterface.ts'
import type Turn from '../domain/entity/Turn.ts'
import ActionName from '../domain/enum/ActionName.ts'

class TurnDecisionManager {
    constructor(
        private readonly _actionPerformer: ActionPerformer,
    ) {
    }

    public processTurn(action: PlayerActionInterface, nextTurn: Turn): TurnResult {
        nextTurn.player.tribe.discardTemporaryBonuses()

        this.performAction(action, nextTurn)

        if (action.gameplayActionName === ActionName.Conquer) {
            return new TurnResult(true, true, true)
        }

        if (action.gameplayActionName === ActionName.Quit) {
            return new TurnResult(true, true, true)
        }

        return new TurnResult(false, true, true)
    }

    private performAction(action: PlayerActionInterface, nextTurn: Turn): void {
        this._actionPerformer.performAction(action, nextTurn)
    }
}

export default TurnDecisionManager
