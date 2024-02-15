import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName.ts'
import type Tile from '../Tile.ts'
import type Tribe from '../Tribe.ts'

class AttackTilePlayerAction implements PlayerActionInterface {
    gameplayActionName = ActionName.AttackTile

    constructor(
        private readonly _actor: Tribe,
        private readonly _defender: Tribe,
        private readonly _tile: Tile,
    ) {
    }

    get actor(): Tribe {
        return this._actor
    }

    get defender(): Tribe {
        return this._defender
    }

    get tile(): Tile {
        return this._tile
    }
}

export default AttackTilePlayerAction
