import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import Action from '../entity/Action'
import type Turn from '../entity/Turn'

@singleton()
class GoTo3rdRadius implements ActionInterface {
    actionName = Action.goTo3rdRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo3rdRadius
