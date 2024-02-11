import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import type FightManager from '../../domain/helper/FightManager.ts'

class Conquer implements ActionInterface {
    actionName = ActionName.Conquer

    constructor(
        private readonly _fightManager: FightManager,
    ) {
    }

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        if (this._fightManager.fightWithRome(turn.player.tribe)) {
            turn.player.tribe.isWinner = true
        }
    }
}

export default Conquer
