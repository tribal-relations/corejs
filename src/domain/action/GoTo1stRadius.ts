import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import type Turn from '../entity/Turn'
import ActionName from '../enum/ActionName'

@singleton()
class GoTo1stRadius implements ActionInterface {
    actionName = ActionName.GoTo1stRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo1stRadius
