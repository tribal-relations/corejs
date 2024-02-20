import type CurrentGame from '../../../app/CurrentGame.ts'
import type TribeManager from '../../../app/TribeManager.ts'
import type GameplayAction from '../../../domain/entity/action/GameplayAction.ts'
import type Technology from '../../../domain/entity/static/Technology.ts'
import type Tribe from '../../../domain/entity/Tribe.ts'
import type Turn from '../../../domain/entity/Turn.ts'
import ActionName from '../../../domain/enum/ActionName.ts'
import type ResourceName from '../../../domain/enum/ResourceName.ts'
import type TechnologyName from '../../../domain/enum/TechnologyName.ts'
import type TribeName from '../../../domain/enum/TribeName.ts'

class ActionInfo {
    constructor(
        private readonly _currentGame: CurrentGame,
        private readonly _tribeManager: TribeManager,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public getTribeNamesExceptCurrentTribe(currentTribe: Tribe): TribeName[] {
        const allTribeNames = this._currentGame.specificGame.tribeNames

        return allTribeNames.filter((tribeName: TribeName) => tribeName !== currentTribe.name)
    }

    public initializeParameters(action: GameplayAction, currentTurn: Turn): { options: string[], model: string } {
        const parametersWithOptionsAndModel = {}
        for (const param of action.parameters) {
            parametersWithOptionsAndModel[param.name] = {
                options: [],
                model: '',
            }
        }

        if (action.parameters.length && action.parameters[0].name === 'Tribe Name') {
            parametersWithOptionsAndModel['Tribe Name'].options = this.getTribeNamesExceptCurrentTribe(currentTurn.player.tribe)
        }
        if (action.name === ActionName.Research) {
            parametersWithOptionsAndModel['Technology Name'].options = this.getPossibleTechnologyNamesForTribe(
                currentTurn.player.tribe,
            )
        }

        return parametersWithOptionsAndModel
    }

    public getPossibleTechnologyNamesForTribe(tribe: Tribe): TechnologyName[] {
        const availableTechnologies = this._tribeManager.getTechnologiesAvailableForResearch(tribe)

        return availableTechnologies.map((tech: Technology) => tech.name)
    }

    public getTribeResourceNamesByTribeName(tribeName: TribeName): ResourceName[] {
        return this._tribeManager.getUniqueResourceNames(
            this._currentGame.getTribe(tribeName),
        )
    }
}

export default ActionInfo
