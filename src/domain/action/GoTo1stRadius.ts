import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

@singleton()
class GoTo1stRadius implements ActionInterface {
    actionName = ActionName.GoTo1stRadius

    public perform(turn: Turn): void {
        turn.player.tribe.goToNextRadius()
    }
}

export default GoTo1stRadius
