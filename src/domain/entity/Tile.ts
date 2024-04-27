import Currency from './static/Currency.ts'
import type Resource from './static/Resource.ts'
import type TileBonus from './TileBonus.ts'
import type Tribe from './Tribe.ts'
import type ResourceName from '../enum/ResourceName.ts'

/**
 * connection between tribe and resource
 * @deprecated
 */
class Tile {
    constructor(
        private readonly _tribe: Tribe,
        private readonly _resource: Resource,
    ) {
    }

    get tribe(): Tribe {
        return this._tribe
    }

    get resourceName(): ResourceName {
        return this._resource.name
    }

    get food(): number {
        return this._resource.food + this.getCurrencyBonusForResource(Currency.Food, this.resourceName)
    }

    get mercantility(): number {
        return this._resource.mercantility + this.getCurrencyBonusForResource(Currency.Mercantility, this.resourceName)
    }

    get production(): number {
        return this._resource.production + this.getCurrencyBonusForResource(Currency.Production, this.resourceName)
    }

    get culture(): number {
        return this._resource.culture + this.getCurrencyBonusForResource(Currency.Culture, this.resourceName)
    }

    private getCurrencyBonusForResource(currency: Currency, resourceName: ResourceName): number {
        return Object.values(this._tribe.tileBonuses)
            .filter((bonus: TileBonus) => bonus.currency === currency)
            .filter((bonus: TileBonus) => bonus.resourceName === resourceName || bonus.resourceName === null)
            .reduce(
                (accumulatedBonus: number, currentBonus) => currentBonus.isMultiplication
                    ? (accumulatedBonus * currentBonus.amount)
                    : (accumulatedBonus + currentBonus.amount),
                0,
            )
    }
}

export default Tile
