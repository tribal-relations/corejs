import type CurrentGame from '../../../app/CurrentGame.ts'
import type RelationsManager from '../../../app/RelationsManager.ts'
import type TurnManager from '../../../app/TurnManager.ts'
import type Player from '../../../domain/entity/Player.ts'
import type Technology from '../../../domain/entity/Technology.ts'
import type Tile from '../../../domain/entity/Tile.ts'
import type Tribe from '../../../domain/entity/Tribe.ts'
import type ResourceName from '../../../domain/enum/ResourceName.ts'
import type TechnologyName from '../../../domain/enum/TechnologyName.ts'
import type TribeName from '../../../domain/enum/TribeName.ts'
import TechnologyRepository from '../../../domain/repository/TechnologyRepository.ts'
import type CommonPlayerController from '../../common/CommonPlayerController.ts'
import type CommonRoundManager from '../../common/CommonRoundManager.ts'
import type RelationRoundManager from '../../console/RelationRoundManager.ts'

class ActionInfo {
    constructor(
        private readonly _relationRoundManager: RelationRoundManager,
        private readonly _playerController: CommonPlayerController,
        private readonly _currentGame: CurrentGame,
        private readonly _turnManager: TurnManager,
        private readonly _relationsManager: RelationsManager,
        private readonly _commonRoundManager: CommonRoundManager,

    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public getCurrentTribeNames(): TribeName[] {
        return Object.values(this._currentGame.players).map((player: Player) => player.tribe.name)
    }

    public getPossibleTechnologiesForTribe(tribe: Tribe): TechnologyName[] {
        return TechnologyRepository.getAll()
            .filter((tech: Technology) => !(tech.name in tribe.technologies))
            .filter((tech: Technology) => Object.values(tech.prerequisites).length === 0 ||
                this.arePrerequisitesMetForTechnology(tribe, tech),
            )
            .map((tech: Technology) => tech.name)
    }

    public getTribeResourceNamesByTribeName(tribeName: TribeName): ResourceName[] {
        return this._currentGame.getTribe(tribeName).tiles
            .map((tile: Tile) => tile.resource.name)
            .filter((value, index, array) => array.indexOf(value) === index)
    }

    private arePrerequisitesMetForTechnology(tribe: Tribe, technology: Technology): boolean {
        // TODO move somewhere else

        for (const prereq in technology.prerequisites) {
            if (!(prereq in tribe.technologies)) {
                return false
            }
        }
        return true
    }
}

export default ActionInfo
