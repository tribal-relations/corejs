import type Turn from '../../domain/entity/turn'
import type ActionInterface from './action-interface'
import { singleton } from 'tsyringe'
import Action from '../../domain/entity/Action'

@singleton()
class GoTo3rdRadius implements ActionInterface {
    actionName = Action.goTo3rdRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo3rdRadius
