import type Turn from '../entity/Turn'
import type ActionName from '../enum/ActionName'

interface ActionInterface {
    actionName: ActionName
    perform: (turn: Turn) => void
}

export default ActionInterface
