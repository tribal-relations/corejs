import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import type Turn from '../entity/Turn'
import ActionName from '../enum/ActionName'

@singleton()
class GoTo2ndRadius implements ActionInterface {
    actionName = ActionName.GoTo2ndRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo2ndRadius
