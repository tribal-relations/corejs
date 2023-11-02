import type Turn from '../../domain/entity/turn'
import type ActionInterface from './action-interface'
import { singleton } from 'tsyringe'
import Action from '../../domain/entity/action'
import DiceThrower from '../diceThrower'

@singleton()
class Expedition implements ActionInterface {
    actionName = Action.arm
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
