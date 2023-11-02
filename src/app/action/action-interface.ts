import type Turn from '../../domain/entity/turn'
import {injectable} from "tsyringe";

@injectable()
interface ActionInterface {
    actionName: string
    perform: (turn: Turn) => void
}

export default ActionInterface
