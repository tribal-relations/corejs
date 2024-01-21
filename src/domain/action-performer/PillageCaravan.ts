import type ActionInterface from './ActionInterface.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type PillageCaravanPlayerAction from '../entity/action/PillageCaravanPlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import type CaravansStore from '../store/CaravansStore.ts'

class PillageCaravan implements ActionInterface {
    actionName = ActionName.Pillage

    constructor(
        private readonly _caravansManager: CaravansStore,
    ) {
    }

    public perform(playerAction: PillageCaravanPlayerAction, _turn: Turn): void {
        if (playerAction.actor.name === playerAction.sender.name) {
            throw new ActionUnsuccessful('Cannot pillage caravan from self.')
        }

        const caravanGold = this._caravansManager.getCaravanPrice(
            playerAction.sender.name,
            playerAction.recipient.name,
        )
        playerAction.actor.addGold(caravanGold)
        this._caravansManager.removeCaravan(
            playerAction.sender.name,
            playerAction.recipient.name,
        )
    }
}

export default PillageCaravan
