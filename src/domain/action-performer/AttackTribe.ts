import type ActionInterface from './ActionInterface.ts'
import type AttackTribePlayerAction from '../entity/action/AttackTribePlayerAction'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName'
import type FightManager from '../helper/FightManager'

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
