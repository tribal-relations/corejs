import type ActionInterface from './ActionInterface.ts'
import type ResearchPlayerAction from '../entity/action/ResearchPlayerAction'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import TechnologyName from '../enum/TechnologyName.ts'

class Research implements ActionInterface {
    actionName = ActionName.Research

    public perform(action: ResearchPlayerAction, turn: Turn): void {
        turn.player.tribe.research(action.technology)
    }

    /**
     * @deprecated
     */
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
