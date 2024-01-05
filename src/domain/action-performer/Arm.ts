import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../entity/action/PlayerActionInterface'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class Arm implements ActionInterface {
    actionName = ActionName.Arm

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        turn.player.tribe.arm()
    }
}

export default Arm
