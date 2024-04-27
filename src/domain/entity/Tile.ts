import type Resource from './static/Resource.ts'
import type TileBonus from './TileBonus.ts'
import type BonusName from '../enum/BonusName.ts'
import type ResourceName from '../enum/ResourceName.ts'

/**
 * connection between tribe and resource
 * @deprecated
 */
class Tile {
    constructor(
        private readonly _resource: Resource,
        private _tileBonuses: Record<BonusName, TileBonus> = Object(),
    ) {
    }

    get tileBonuses(): Record<BonusName, TileBonus> {
        return this._tileBonuses
    }

    set tileBonuses(upd: Record<BonusName, TileBonus>) {
        this._tileBonuses = upd
    }

    get resourceName(): ResourceName {
        return this._resource.name
    }

    get food(): number {
        return this._resource.food
    }

    get mercantility(): number {
        return this._resource.mercantility
    }

    get production(): number {
        return this._resource.production
    }

    get culture(): number {
        return this._resource.culture
    }
}

export default Tile
