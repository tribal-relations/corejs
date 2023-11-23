import type Turn from '../entity/Turn.ts'
import type ActionName from '../enum/ActionName.ts'

interface ActionInterface {
    actionName: ActionName
    perform: (turn: Turn) => void
}

export default ActionInterface
