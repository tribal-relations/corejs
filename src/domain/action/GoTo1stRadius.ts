import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import Action from '../entity/Action'
import type Turn from '../entity/Turn'

@singleton()
class GoTo1stRadius implements ActionInterface {
    actionName = Action.goTo1stRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo1stRadius
