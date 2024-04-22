import type BonusInterface from './BonusInterface.ts'
import type Currency from './Currency.ts'
import type BonusName from '../../enum/BonusName.ts'
import type EntityInterface from '../EntityInterface.ts'

class Bonus implements BonusInterface, EntityInterface {
    Name: BonusName
    constructor(
        private readonly _name: BonusName,
        private readonly _amount: number,
        private readonly _currency: Currency,
    ) {
    }

    get name(): BonusName {
        return this._name
    }

    get amount(): number {
        return this._amount
    }

    get currency(): Currency {
        return this._currency
    }
}

export default Bonus
