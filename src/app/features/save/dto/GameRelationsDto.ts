import type RelationName from '../../../../domain/enum/RelationName.ts'
import type TribeName from '../../../../domain/enum/TribeName.ts'

class GameRelationsDto {
    public constructor(
        private _relations: Record<TribeName, Record<TribeName, RelationName>> = Object(),
    ) {
    }

    get relations(): Record<TribeName, Record<TribeName, RelationName>> {
        return this._relations
    }

    set relations(relations: Record<TribeName, Record<TribeName, RelationName>>) {
        this._relations = relations
    }
}

export default GameRelationsDto
