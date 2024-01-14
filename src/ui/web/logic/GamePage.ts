import type CurrentGame from '../../../app/CurrentGame'
import type RelationsManager from '../../../app/RelationsManager'
import type TurnManager from '../../../app/TurnManager'
import TurnResult from '../../../app/TurnResult'
import type Player from '../../../domain/entity/Player'
import type Technology from '../../../domain/entity/Technology'
import type Tile from '../../../domain/entity/Tile'
import type Tribe from '../../../domain/entity/Tribe'
import type Turn from '../../../domain/entity/Turn'
import type ResourceName from '../../../domain/enum/ResourceName'
import type TechnologyName from '../../../domain/enum/TechnologyName'
import type TribeName from '../../../domain/enum/TribeName'
import TechnologyRepository from '../../../domain/repository/TechnologyRepository'
import type CommonPlayerController from '../../common/CommonPlayerController'
import type CommonRoundManager from '../../common/CommonRoundManager'
import type RelationRoundManager from '../../console/RelationRoundManager'

class GamePage {
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

    public howManyActionsCanTribePerformThisTurn(tribe: Tribe): number {
        return this._commonRoundManager.howManyActionsCanTribePerformThisTurn(tribe)
    }

    public onStartClick(playerNames: string[]) {
        this.validateNames(playerNames)

        this.makeFirstOneTimeSetup(playerNames)

        const nextTurn = this._turnManager.nextTurn(this.game)
        const turnResult = this.doAllPlayerActions(nextTurn)
    }

    public onNextTurnClick(): TurnResult {
        const nextTurn = this._turnManager.nextTurn(this.game)
        const turnResult = this.doAllPlayerActions(nextTurn)
        return turnResult
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

    private arePrerequisitesMetForTechnology(tribe: Tribe, technology: Technology): boolean {
        // TODO move somewhere else

        for (const prereq in technology.prerequisites) {
            if (!(prereq in tribe.technologies)) {
                return false
            }
        }
        return true
    }

    public getTribeResourceNamesByTribeName(tribeName: TribeName): ResourceName[] {
        return this._currentGame.getTribe(tribeName).tiles
            .map((tile: Tile) => tile.resource.name)
            .filter((value, index, array) => array.indexOf(value) === index)
    }

    private doAllPlayerActions(nextTurn: Turn): TurnResult {
        const totalActions = Math.max(
            this._relationsManager.getTribeTotalBonus(nextTurn.player.tribe.name) + 1,
            1,
        )

        let turnResult: TurnResult
        for (let i = 0; i < totalActions; ++i) {
            turnResult = this.doWhatPlayerSaysSafely(nextTurn.player, nextTurn)
        }

        return turnResult
    }

    private doWhatPlayerSaysSafely(player: Player, nextTurn: Turn): TurnResult {
        console.log(`doWhatPlayerSaysSafely ${player.tribe.name}`)
        return new TurnResult()
    }

    private validateNames(playerNames: string[]): void {

    }

    private makeFirstOneTimeSetup(names: string[]) {
        this.game.players = this._playerController.createPlayers(names)
        this._relationRoundManager.setStarterRelationsFromGame(this.game)
    }
}

export default GamePage
