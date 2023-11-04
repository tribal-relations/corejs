import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import type Turn from '../entity/Turn'
import ActionName from '../enum/ActionName'
import FightManager from '../helper/FightManager'

@singleton()
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
