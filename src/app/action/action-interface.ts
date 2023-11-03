import type Turn from '../../domain/entity/turn'

interface ActionInterface {
    actionName: string
    perform: (turn: Turn) => void
}

export default ActionInterface
