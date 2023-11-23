import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import DiceThrower from '../helper/DiceThrower.ts'

@singleton()
class Expedition implements ActionInterface {
    actionName = ActionName.Expedition
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
