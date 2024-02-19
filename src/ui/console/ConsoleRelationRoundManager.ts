import type ConsolePlayerRelationActionIo from './io/ConsolePlayerRelationActionIo.ts'
import type Std from './io/Std'
import ConsolePlayerRelationActionRepository from './repository/ConsolePlayerRelationActionRepository.ts'
import type CurrentGame from '../../app/CurrentGame.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import type RelationName from '../../domain/enum/RelationName.ts'
import type TribeName from '../../domain/enum/TribeName.ts'
import type RelationsStore from '../../domain/store/RelationsStore.ts'
import type CommonRelationRoundManager from '../common/CommonRelationRoundManager.ts'

class ConsoleRelationRoundManager {
    constructor(
        private readonly _relationsManager: RelationsStore,
        private readonly _playerRelationActionGetter: ConsolePlayerRelationActionIo,
        private readonly _currentGame: CurrentGame,
        private readonly _commonRelationRoundManager: CommonRelationRoundManager,
        private readonly _std: Std,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public setStarterRelationsFromGame(game: CurrentGame) {
        this._commonRelationRoundManager.setStarterRelationsFromGame(game)
    }

    public determineRelations(): void {
        if (Object.keys(this.game.players).length < 2) {
            return
        }
        this._std.outHeading('[RELATIONS PHASE]')
        this._std.out('Each tribe must specify its reaction to other tribes.')
        this._std.out('Use relation shorthands to specify relation.')
        this._std.out('Separate relation shorthands with space.')
        this._std.outTable(ConsolePlayerRelationActionRepository.cliParameterToRelationNameMap)

        let tribe: Tribe
        for (const playerName in this.game.players) {
            tribe = this.game.players[playerName].tribe
            this._commonRelationRoundManager.saveRelationsForTribe(
                tribe,
                this.getRelationsTowardsOtherTribes(tribe),
            )
        }
    }

    private getRelationsTowardsOtherTribes(tribe: Tribe): Array<{ 'tribeName': TribeName, 'relationName': RelationName }> {
        const otherTribesNames = this._commonRelationRoundManager.getOtherTribesNames(tribe)
        return this._playerRelationActionGetter.getRelationsTowardsOtherTribes(tribe, otherTribesNames)
    }
}

export default ConsoleRelationRoundManager
