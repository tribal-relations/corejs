import type ActionInterface from './ActionInterface.ts'
import AlreadyKnownTechnology from '../../exception/AlreadyKnownTechnology.ts'
import InvalidChoice from '../../exception/InvalidChoice.ts'
import UnavailableTechnology from '../../exception/UnavailableTechnology.ts'
import type ResearchPlayerAction from '../entity/action/ResearchPlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class Research implements ActionInterface {
    actionName = ActionName.Research

    public perform(action: ResearchPlayerAction, turn: Turn): void {
        try {
            turn.player.tribe.research(action.technology)
        } catch (error) {
            if (error instanceof AlreadyKnownTechnology) {
                throw new InvalidChoice('You entered already known technology.')
            }
            if (error instanceof UnavailableTechnology) {
                throw new InvalidChoice('You entered unavailable technology. Consult technology tree.')
            }

            throw error
        }
    }
}

export default Research
