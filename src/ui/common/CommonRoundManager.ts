import type RelationsManager from '../../app/RelationsManager'
import type Tribe from '../../domain/entity/Tribe.ts'

class CommonRoundManager {
    constructor(
        private readonly _relationsManager: RelationsManager,
    ) {
    }

    public howManyActionsCanTribePerformThisTurn(tribe: Tribe): number {
        const totalActions = Math.max(
            this._relationsManager.getTribeTotalBonus(tribe.name) + 1,
            1,
        )

        return totalActions
    }
}

export default CommonRoundManager
