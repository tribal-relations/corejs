import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'

class GoTo3rdRadius implements ActionInterface {
    actionName = ActionName.GoTo3rdRadius

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo3rdRadius
