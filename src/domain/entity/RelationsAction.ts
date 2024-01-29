import type Player from './Player.ts'
import type RelationName from '../enum/RelationName.ts'
import type TribeName from '../enum/TribeName.ts'

class RelationsAction {
    constructor(
        private readonly _player: Player,
        private readonly _relationsToOtherTribes: Record<TribeName, RelationName>,
    ) {
    }

    get player(): Player {
        return this._player
    }

    get relations(): Record<TribeName, RelationName> {
        return this._relationsToOtherTribes
    }
}

export default RelationsAction
