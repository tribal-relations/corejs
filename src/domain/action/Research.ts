import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import TechnologyName from '../enum/TechnologyName.ts'

@singleton()
class Research implements ActionInterface {
    actionName = ActionName.Research

    public perform(turn: Turn): void {
        this.research(turn)
    }

    private research(turn: Turn): void {
        const techName = turn.parameters
        const validTechName: TechnologyName = this.getValidTechnologyNameOrThrow(techName)
        turn.player.tribe.research(validTechName)
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
