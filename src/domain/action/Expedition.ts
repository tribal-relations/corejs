import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import type Turn from '../entity/Turn'
import ActionName from '../enum/ActionName'
import DiceThrower from '../helper/DiceThrower'

@singleton()
class Expedition implements ActionInterface {
    actionName = ActionName.expedition
    successSides = 5 // if 1 then failure

    constructor(
        private readonly _diceThrower: DiceThrower,
    ) {
    }

    public perform(turn: Turn): void {
        this.startExpedition(turn)
    }

    private startExpedition(turn: Turn): void {
        if (this._diceThrower.ifSuccessD6(this.successSides)) {
            turn.player.tribe.makeTerritorialDiscovery()
        }
    }
}

export default Expedition
