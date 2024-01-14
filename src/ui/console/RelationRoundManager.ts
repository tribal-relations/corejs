import type PlayerRelationActionGetter from './PlayerRelationActionGetter'
import type CurrentGame from '../../app/CurrentGame.ts'
import type RelationsManager from '../../app/RelationsManager'
import type Player from '../../domain/entity/Player'
import type Tribe from '../../domain/entity/Tribe'
import type RelationName from '../../domain/enum/RelationName'
import type TribeName from '../../domain/enum/TribeName'

class RelationRoundManager {
    constructor(
        private readonly _relationsManager: RelationsManager,
        private readonly _playerRelationActionGetter: PlayerRelationActionGetter,
        private readonly _currentGame: CurrentGame,

    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public setStarterRelationsFromGame(game: CurrentGame) {
        this._relationsManager.setStarterRelations(Object.values(game.players).map((value: Player) => value.tribe.name))
    }

    public determineRelations(): void {
        this.startRelationRounds()
    }

    private startRelationRounds(): void {
        for (const playerName in this.game.players) {
            this.determineRelationsForTribe(this.game.players[playerName].tribe)
        }
    }

    private determineRelationsForTribe(tribe: Tribe): void {
        const otherTribes = this.getOtherTribes(tribe)
        const relationsTowardsOtherTribes = this._playerRelationActionGetter.getRelationsTowardsOtherTribes(tribe, otherTribes)
        for (const relation: { 'tribeName': TribeName, 'relationName': RelationName } of relationsTowardsOtherTribes) {
            this._relationsManager.setRelations(tribe.name, relation.tribeName, relation.relationName)
        }
    }

    private getOtherTribes(tribe: Tribe): Tribe[] {
        return Object.values(this.game.players)
            .filter((value: Player) => value.tribe.name !== tribe.name)
            .map((value: Player) => value.tribe)
    }
}

export default RelationRoundManager
