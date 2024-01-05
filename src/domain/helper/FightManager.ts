import Rome from '../entity/Rome.ts'
import type Tribe from '../entity/Tribe.ts'
import type CanFight from '../interface/CanFight.ts'


class FightManager {
    constructor(
        private readonly _rome: Rome,
    ) {
    }

    public fightWithRome(tribe: Tribe): boolean {
        return this.fightWithAnotherTribe(tribe, this._rome)
    }

    public fightWithAnotherTribe(currentTribe: Tribe, defender: CanFight): boolean {
        const battleResult = this.compareMilitaryPower(currentTribe, defender)
        if (battleResult > 0) {
            return true
        }
        if (battleResult === 0) {
            return false
        }
        if (battleResult < 0) {
            currentTribe.takeLosses(-battleResult)
        }
        return false
    }

    private compareMilitaryPower(currentTribe: Tribe, defender: CanFight): number {
        return currentTribe.militaryPower - defender.militaryPower
    }
}
export default FightManager
