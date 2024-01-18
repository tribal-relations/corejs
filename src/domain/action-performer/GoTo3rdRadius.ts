import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../entity/action/PlayerActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class GoTo3rdRadius implements ActionInterface {
    actionName = ActionName.GoTo3rdRadius

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo3rdRadius
