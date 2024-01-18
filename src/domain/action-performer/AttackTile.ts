import type ActionInterface from './ActionInterface.ts'
import type AttackTilePlayerAction from '../entity/action/AttackTilePlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import type FightManager from '../helper/FightManager.ts'

class AttackTile implements ActionInterface {
    actionName = ActionName.AttackTile

    constructor(
        private readonly _fightManager: FightManager,
    ) {
    }

    public perform(playerAction: AttackTilePlayerAction, _: Turn): void {
        const didAttackerWin = this._fightManager.fightWithAnotherTribeOverTile(
            playerAction.actor,
            playerAction.defender,
        )
        if (didAttackerWin) {
            playerAction.defender.detachTile(playerAction.tile)
            playerAction.actor.attachTile(playerAction.tile)
        }
    }
}

export default AttackTile
