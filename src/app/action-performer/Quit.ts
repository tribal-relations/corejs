import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'

class Quit implements ActionInterface {
    actionName = ActionName.Quit

    public perform(_playerAction: PlayerActionInterface, _turn: Turn): void {
    }
}

export default Quit
