import type ConsolePlayerRelationActionIo from './io/ConsolePlayerRelationActionIo.ts'
import type CurrentGame from '../../app/CurrentGame.ts'
import type RelationsManager from '../../app/RelationsManager.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import type RelationName from '../../domain/enum/RelationName.ts'
import type TribeName from '../../domain/enum/TribeName.ts'
import type CommonRelationRoundManager from '../common/CommonRelationRoundManager.ts'

class ConsoleRelationRoundManager {
    constructor(
        private readonly _relationsManager: RelationsManager,
        private readonly _playerRelationActionGetter: ConsolePlayerRelationActionIo,
        private readonly _currentGame: CurrentGame,
        private readonly _commonRelationRoundManager: CommonRelationRoundManager,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public setStarterRelationsFromGame(game: CurrentGame) {
        this._commonRelationRoundManager.setStarterRelationsFromGame(game)
    }

    public determineRelations(): void {
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
