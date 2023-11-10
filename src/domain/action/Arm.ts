import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import type Turn from '../entity/Turn'
import ActionName from '../enum/ActionName'

@singleton()
class Arm implements ActionInterface {
    actionName = ActionName.Arm

    public perform(turn: Turn): void {
        turn.player.tribe.arm()
    }
}

export default Arm
