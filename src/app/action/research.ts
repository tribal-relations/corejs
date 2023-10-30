import type Turn from '../../domain/entity/turn'
import type Tribe from '../../domain/entity/tribe'
import Technology from '../../domain/entity/technology'
import type ActionInterface from './action-interface'
import { singleton } from 'tsyringe'
import Action from '../../domain/entity/action'

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
