import type ActionInterface from './ActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class Arm implements ActionInterface {
    actionName = ActionName.Arm

    public perform(turn: Turn): void {
        turn.player.tribe.arm()
    }
}

export default Arm
