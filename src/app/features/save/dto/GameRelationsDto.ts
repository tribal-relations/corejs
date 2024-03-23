import type RelationName from '../../../../domain/enum/RelationName.ts'
import type TribeName from '../../../../domain/enum/TribeName.ts'
import type CurrentGame from '../../../CurrentGame.ts'

class GameRelationsDto {
    public constructor(
        private _relations: Record<TribeName, Record<TribeName, RelationName>> = Object(),
    ) {
    }

    static createFromCurrentGame(game: CurrentGame): GameRelationsDto {
        // TODO implement
        const dto = new GameRelationsDto(
            Object(),
        )

        return dto
    }

    get relations(): Record<TribeName, Record<TribeName, RelationName>> {
        return this._relations
    }

    set relations(relations: Record<TribeName, Record<TribeName, RelationName>>) {
        this._relations = relations
    }
}

export default GameRelationsDto
