import type ActionInterface from './ActionInterface.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type PillageCaravanPlayerAction from '../entity/action/PillageCaravanPlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import type AlliancesStore from '../store/AlliancesStore.ts'
import type CaravansStore from '../store/CaravansStore.ts'

class PillageCaravan implements ActionInterface {
    actionName = ActionName.Pillage

    constructor(
        private readonly _caravansManager: CaravansStore,
        private readonly _alliancesStore: AlliancesStore,

    ) {
    }

    public perform(playerAction: PillageCaravanPlayerAction, _turn: Turn): void {
        if (playerAction.actor.name === playerAction.sender.name) {
            throw new ActionUnsuccessful('Cannot pillage caravan from self.')
        }

        if (this._alliancesStore.doesXHaveAllianceWithY(
            playerAction.actor.name,
            playerAction.recipient.name,
        )) {
            throw new ActionUnsuccessful('Cannot pillage caravan to allied tribe.')
        }

        if (this._alliancesStore.doesXHaveAllianceWithY(
            playerAction.actor.name,
            playerAction.sender.name,
        )) {
            throw new ActionUnsuccessful('Cannot pillage caravan from allied tribe.')
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
