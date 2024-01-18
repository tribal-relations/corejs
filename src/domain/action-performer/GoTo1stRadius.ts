import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../entity/action/PlayerActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class GoTo1stRadius implements ActionInterface {
    actionName = ActionName.GoTo1stRadius

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo1stRadius
