import type Turn from '../../domain/entity/turn'
import type ActionInterface from './action-interface'
import { singleton } from 'tsyringe'
import Action from '../../domain/entity/action'

@singleton()
class Arm implements ActionInterface {
    actionName = Action.arm

    public perform(turn: Turn): void {
        this.arm(turn)
    }

    private arm(turn: Turn): void {
        turn.player.tribe.arm()
    }
}

export default Arm
