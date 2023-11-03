import type Turn from '../../domain/entity/turn'
import type ActionInterface from './action-interface'
import { singleton } from 'tsyringe'
import Action from '../../domain/entity/Action'

@singleton()
class GoTo2ndRadius implements ActionInterface {
    actionName = Action.goTo2ndRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo2ndRadius
