import type Turn from '../entity/Turn'

interface ActionInterface {
    actionName: string
    perform: (turn: Turn) => void
}

export default ActionInterface
