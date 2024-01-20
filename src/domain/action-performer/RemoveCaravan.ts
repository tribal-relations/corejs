import type ActionInterface from './ActionInterface.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type RemoveCaravanPlayerAction from '../entity/action/RemoveCaravanPlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import type CaravansStore from '../store/CaravansStore.ts'

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
