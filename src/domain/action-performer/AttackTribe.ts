import type ActionInterface from './ActionInterface.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type AttackTribePlayerAction from '../entity/action/AttackTribePlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import type FightManager from '../helper/FightManager.ts'
import type AlliancesStore from '../store/AlliancesStore.ts'

class AttackTribe implements ActionInterface {
    actionName = ActionName.AttackTribe

    constructor(
        private readonly _fightManager: FightManager,
        private readonly _alliancesStore: AlliancesStore,
    ) {
    }

    public perform(playerAction: AttackTribePlayerAction, _: Turn): void {
        if (this._alliancesStore.doesXHaveAllianceWithY(
            playerAction.actor.name,
            playerAction.defender.name,
        )) {
            throw new ActionUnsuccessful(ActionName.AttackTribe, 'Cannot attack allied tribe.')
        }

        this._fightManager.fightWithAnotherTribe(
            playerAction.actor,
            playerAction.defender,
        )
    }
}

export default AttackTribe
