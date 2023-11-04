import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import Action from '../entity/Action'
import Technology from '../entity/Technology'
import type Tribe from '../entity/Tribe'
import type Turn from '../entity/Turn'

@singleton()
class Research implements ActionInterface {
    actionName = Action.research

    public perform(turn: Turn): void {
        this.research(turn)
    }

    private research(turn: Turn): void {
        const techName = turn.parameters
        this.checkTechnologyIsNotBlocked(turn.player.tribe, techName)
        turn.player.tribe.research(techName)
    }

    private checkTechnologyIsNotBlocked(tribe: Tribe, techName: string): void {
        if (techName in tribe.technologies) {
            throw new Error(`${tribe.name} cannot research ${techName}, because it is already known`)
        }
        const techInstance = Technology.createFromName(techName)
        let prerequisiteName: string
        for (prerequisiteName in techInstance.prerequisites) {
            if (!(prerequisiteName in tribe.technologies)) {
                throw new Error(`${tribe.name} cannot research ${techName}, because not all prerequisites are met`)
            }
        }
    }
}

export default Research
