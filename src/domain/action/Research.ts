import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import TechnologyRepository from '../../app/repository/TechnologyRepository'
import type Tribe from '../entity/Tribe'
import type Turn from '../entity/Turn'
import ActionName from '../enum/ActionName'
import TechnologyName from '../enum/TechnologyName'

@singleton()
class Research implements ActionInterface {
    actionName = ActionName.research

    public perform(turn: Turn): void {
        this.research(turn)
    }

    private research(turn: Turn): void {
        const techName = turn.parameters
        const validTechName: TechnologyName = this.getValidTechnologyNameOrThrow(techName)
        this.checkTechnologyIsNotBlocked(turn.player.tribe, validTechName)
        turn.player.tribe.research(techName)
    }

    private checkTechnologyIsNotBlocked(tribe: Tribe, techName: TechnologyName): void {
        if (techName in tribe.technologies) {
            throw new Error(`${tribe.name} cannot research ${techName}, because it is already known`)
        }
        const techInstance = TechnologyRepository.createFromName(techName)
        let prerequisiteName: string
        for (prerequisiteName in techInstance.prerequisites) {
            if (!(prerequisiteName in tribe.technologies)) {
                throw new Error(`${tribe.name} cannot research ${techName}, because not all prerequisites are met`)
            }
        }
    }

    private getValidTechnologyNameOrThrow(techName: string): TechnologyName {
        const enumValuesFiltered = (Object as any)
            .values(TechnologyName)
            .filter((validTechName: any) => validTechName === techName)

        if (enumValuesFiltered.length < 1) {
            throw new Error(`Invalid technology name '${techName}'.`)
        }

        return enumValuesFiltered[0]
    }
}

export default Research
