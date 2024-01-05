import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../entity/action/PlayerActionInterface'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class GoTo2ndRadius implements ActionInterface {
    actionName = ActionName.GoTo2ndRadius

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo2ndRadius
