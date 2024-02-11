import type BonusInterface from './BonusInterface.ts'
import type Currency from './Currency.ts'
import type Tribe from './Tribe.ts'
import type TechnologyBonusName from '../enum/TechnologyBonusName.ts'
import type TechnologyName from '../enum/TechnologyName.ts'

class TechnologyBonus implements BonusInterface {
    constructor(
        private readonly _recipient: Tribe,
        private readonly _name: TechnologyBonusName,
        private readonly _amount: number,
        private readonly _currency: Currency,
        private readonly _technologyName: TechnologyName,
    ) {
    }

    get recipient(): Tribe {
        return this._recipient
    }

    get name(): TechnologyBonusName {
        return this._name
    }

    get amount(): number {
        return this._amount
    }

    get currency(): Currency {
        return this._currency
    }

    get technologyName(): TechnologyName {
        return this._technologyName
    }
}

export default TechnologyBonus
