import type TribeManager from '../../app/TribeManager.ts'
import type Rome from '../entity/Rome.ts'
import type Tribe from '../entity/Tribe.ts'

class FightManager {
    constructor(
        private readonly _rome: Rome,
        private readonly _tribeManager: TribeManager,
    ) {
    }

    public fightWithRome(tribe: Tribe): boolean {
        return this.fightWithAnotherTribe(tribe, this._rome)
    }

    public fightWithAnotherTribe(currentTribe: Tribe, defender: Tribe | Rome): boolean {
        const battleResult = this.compareMilitaryPower(currentTribe, defender)
        if (battleResult > 0) {
            this._tribeManager.takeLosses(defender, battleResult)

            return true
        }
        if (battleResult === 0) {
            return false
        }
        if (battleResult < 0) {
            this._tribeManager.takeLosses(currentTribe, -battleResult)
        }
        return false
    }

    public fightWithAnotherTribeOverTile(currentTribe: Tribe, defender: Tribe | Rome): boolean {
        const battleResult = this.compareMilitaryPower(currentTribe, defender)
        // when fighting over tile, defender does not suffer losses, except for tile
        if (battleResult > 0) {
            return true
        }
        if (battleResult === 0) {
            return false
        }
        if (battleResult < 0) {
            this._tribeManager.takeLosses(currentTribe, -battleResult)
        }
        return false
    }

    private compareMilitaryPower(currentTribe: Tribe, defender: Tribe | Rome): number {
        return currentTribe.militaryPower - defender.militaryPower
    }
}
export default FightManager
