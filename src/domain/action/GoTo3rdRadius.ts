import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import type Turn from '../entity/Turn'
import ActionName from '../enum/ActionName'

@singleton()
class GoTo3rdRadius implements ActionInterface {
    actionName = ActionName.goTo3rdRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo3rdRadius
