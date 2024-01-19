import type CurrentGame from '../../app/CurrentGame.ts'
import type RelationsManager from '../../app/RelationsManager.ts'
import type Player from '../../domain/entity/Player.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import type RelationName from '../../domain/enum/RelationName.ts'
import type TribeName from '../../domain/enum/TribeName.ts'

class CommonRelationRoundManager {
    constructor(
        private readonly _relationsManager: RelationsManager,
        private readonly _currentGame: CurrentGame,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public setStarterRelationsFromGame(game: CurrentGame) {
        this._relationsManager.setStarterRelations(Object.values(game.players).map((value: Player) => value.tribe.name))
    }

    public saveRelationsForTribe(tribe: Tribe, relationsTowardsOtherTribes: Array<{ 'tribeName': TribeName, 'relationName': RelationName }>): void {
        const relations: Record<TribeName, RelationName> = Object()

        for (const relation: { 'tribeName': TribeName, 'relationName': RelationName } of relationsTowardsOtherTribes) {
            relations[relation.tribeName] = relation.relationName
        }

        this._relationsManager.setAllRelationsForTribe(tribe.name, relations)
    }

    public getOtherTribes(tribe: Tribe): Tribe[] {
        return Object.values(this.game.players)
            .filter((value: Player) => value.tribe.name !== tribe.name)
            .map((value: Player) => value.tribe)
    }
}

export default CommonRelationRoundManager
