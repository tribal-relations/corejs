import type Turn from '../../domain/entity/turn'
import type ActionInterface from './action-interface'
import { singleton } from 'tsyringe'
import Action from '../../domain/entity/Action'

@singleton()
class GoTo1stRadius implements ActionInterface {
    actionName = Action.goTo1stRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo1stRadius
