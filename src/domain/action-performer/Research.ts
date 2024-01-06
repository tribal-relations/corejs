import type ActionInterface from './ActionInterface.ts'
import type ResearchPlayerAction from '../entity/action/ResearchPlayerAction'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class Research implements ActionInterface {
    actionName = ActionName.Research

    public perform(action: ResearchPlayerAction, turn: Turn): void {
        turn.player.tribe.research(action.technology)
    }
}

export default Research
