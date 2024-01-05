import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName'
import ActionRepository from '../../repository/ActionRepository'
import type Tile from '../Tile'
import type Tribe from '../Tribe'

class AttackTilePlayerAction implements PlayerActionInterface {
    gameAction = ActionRepository.createFromName(ActionName.AttackTile)

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
