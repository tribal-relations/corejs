import type ActionInterface from './ActionInterface.ts'
import type AlliancePlayerAction from '../../domain/entity/action/AlliancePlayerAction.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import type AlliancesStore from '../../domain/store/AlliancesStore.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'

class Alliance implements ActionInterface {
    actionName = ActionName.Alliance

    constructor(
        private readonly _alliancesStore: AlliancesStore,

    ) {
    }

    public perform(playerAction: AlliancePlayerAction, _turn: Turn): void {
        if (playerAction.actor.name === playerAction.recipient.name) {
            throw new ActionUnsuccessful(ActionName.Alliance, 'Cannot create alliance with yourself.')
        }

        if (this._alliancesStore.doesXHaveAllianceWithY(playerAction.actor.name, playerAction.recipient.name)) {
            throw new ActionUnsuccessful(ActionName.Alliance, 'Cannot create alliance because it already exists.')
        }

        this._alliancesStore.setAlliance(
            playerAction.actor.name,
            playerAction.recipient.name,
        )
    }
}

export default Alliance
