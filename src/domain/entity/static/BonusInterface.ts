import type Currency from './Currency.ts'
import type BonusName from '../../enum/BonusName.ts'
import type TechnologyBonusName from '../../enum/TechnologyBonusName.ts'
import type TileBonusName from '../../enum/TileBonusName.ts'

interface BonusInterface {

    get name(): BonusName | TechnologyBonusName | TileBonusName

    get amount(): number

    get currency(): Currency
}

export default BonusInterface
