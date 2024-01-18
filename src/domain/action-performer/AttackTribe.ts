import type ActionInterface from './ActionInterface.ts'
import type AttackTribePlayerAction from '../entity/action/AttackTribePlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import type FightManager from '../helper/FightManager.ts'

class AttackTribe implements ActionInterface {
    actionName = ActionName.AttackTribe

    constructor(
        private readonly _fightManager: FightManager,
    ) {
    }

    public perform(playerAction: AttackTribePlayerAction, _: Turn): void {
        this._fightManager.fightWithAnotherTribe(
            playerAction.actor,
            playerAction.defender,
        )
    }
}

export default AttackTribe
