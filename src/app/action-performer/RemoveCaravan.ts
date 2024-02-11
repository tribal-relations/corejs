import type ActionInterface from './ActionInterface.ts'
import type RemoveCaravanPlayerAction from '../../domain/entity/action/RemoveCaravanPlayerAction.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import type CaravansStore from '../../domain/store/CaravansStore.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'

class RemoveCaravan implements ActionInterface {
    actionName = ActionName.RemoveCaravan

    constructor(
        private readonly _caravansManager: CaravansStore,
    ) {
    }

    public perform(playerAction: RemoveCaravanPlayerAction, _turn: Turn): void {
        if (playerAction.actor.name === playerAction.recipient.name) {
            throw new ActionUnsuccessful('Cannot remove caravan from self.')
        }

        this._caravansManager.removeCaravan(
            playerAction.actor.name,
            playerAction.recipient.name,
        )
    }
}

export default RemoveCaravan
