import type PlayerActionInterface from '../entity/action/PlayerActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import type ActionName from '../enum/ActionName.ts'

interface ActionInterface {
    actionName: ActionName
    perform: (playerAction: PlayerActionInterface, turn: Turn) => void
}

export default ActionInterface
