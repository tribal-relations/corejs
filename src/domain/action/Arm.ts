import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import Action from '../entity/Action'
import type Turn from '../entity/Turn'

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
