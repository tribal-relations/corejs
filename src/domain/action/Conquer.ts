import type ActionInterface from './ActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import type FightManager from '../helper/FightManager.ts'

class Conquer implements ActionInterface {
    actionName = ActionName.Conquer

    constructor(
        private readonly _fightManager: FightManager,
    ) {
    }

    public perform(turn: Turn): void {
        this.startExpedition(turn)
    }

    private startExpedition(turn: Turn): void {
        if (this._fightManager.fightWithRome(turn.player.tribe)) {
            turn.player.tribe.isWinner = true
        }
    }
}

export default Conquer
