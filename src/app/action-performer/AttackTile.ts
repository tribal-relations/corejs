import type ActionInterface from './ActionInterface.ts'
import type AttackTilePlayerAction from '../../domain/entity/action/AttackTilePlayerAction.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import type FightManager from '../../domain/helper/FightManager.ts'
import type TribeManager from '../TribeManager.ts'

class AttackTile implements ActionInterface {
    actionName = ActionName.AttackTile

    constructor(
        private readonly _fightManager: FightManager,
        private readonly _tribeManager: TribeManager,

    ) {
    }

    public perform(playerAction: AttackTilePlayerAction, _: Turn): void {
        const didAttackerWin = this._fightManager.fightWithAnotherTribeOverTile(
            playerAction.actor,
            playerAction.defender,
        )
        if (didAttackerWin) {
            this._tribeManager.detachTile(playerAction.defender, playerAction.tile)
            this._tribeManager.addTile(playerAction.actor, playerAction.tile)
        }
    }
}

export default AttackTile
