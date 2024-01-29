import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import type Turn from '../../domain/entity/Turn.ts'
import type ActionName from '../../domain/enum/ActionName.ts'

interface ActionInterface {
    actionName: ActionName
    perform: (playerAction: PlayerActionInterface, turn: Turn) => void
}

export default ActionInterface
