import type BonusInterface from './static/BonusInterface.ts'
import type Currency from './static/Currency.ts'
import type Tribe from './Tribe.ts'
import type ResourceName from '../enum/ResourceName'
import type TileBonusName from '../enum/TileBonusName.ts'

/**
 * Every tile with _resourceName gives +_amount _currency more
 */
class TileBonus implements BonusInterface {
    constructor(
        private readonly _recipient: Tribe,
        private readonly _name: TileBonusName,
        private readonly _amount: number,
        private readonly _currency: Currency,
        private readonly _resourceName: ResourceName | null,
        private readonly _isMultiplication: boolean = false,
    ) {
    }

    get recipient(): Tribe {
        return this._recipient
    }

    get name(): TileBonusName {
        return this._name
    }

    get amount(): number {
        return this._amount
    }

    get currency(): Currency {
        return this._currency
    }

    get resourceName(): ResourceName | null {
        return this._resourceName
    }

    get isMultiplication(): boolean {
        return this._isMultiplication
    }
}

export default TileBonus
