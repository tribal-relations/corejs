import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../entity/action/PlayerActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class Quit implements ActionInterface {
    actionName = ActionName.Quit

    public perform(_playerAction: PlayerActionInterface, _turn: Turn): void {
    }
}

export default Quit
