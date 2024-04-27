import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName.ts'
import type ResourceName from '../../enum/ResourceName'
import type Tribe from '../Tribe.ts'

class AttackTilePlayerAction implements PlayerActionInterface {
    gameplayActionName = ActionName.AttackTile

    constructor(
        private readonly _actor: Tribe,
        private readonly _defender: Tribe,
        private readonly _tile: ResourceName,
    ) {
    }

    get actor(): Tribe {
        return this._actor
    }

    get defender(): Tribe {
        return this._defender
    }

    get tile(): ResourceName {
        return this._tile
    }
}

export default AttackTilePlayerAction
