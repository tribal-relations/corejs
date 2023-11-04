import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import Action from '../entity/Action'
import type Turn from '../entity/Turn'

@singleton()
class GoTo2ndRadius implements ActionInterface {
    actionName = Action.goTo2ndRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo2ndRadius
