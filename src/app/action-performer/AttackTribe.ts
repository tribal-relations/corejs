import type ActionInterface from './ActionInterface.ts'
import type AttackTribePlayerAction from '../../domain/entity/action/AttackTribePlayerAction.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import type FightManager from '../../domain/helper/FightManager.ts'
import type AlliancesStore from '../../domain/store/AlliancesStore.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'

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
