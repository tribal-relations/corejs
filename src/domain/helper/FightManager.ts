import { singleton } from 'tsyringe'
import Rome from '../entity/Rome'
import type Tribe from '../entity/Tribe'
import type CanFight from '../interface/CanFight'

@singleton()
class FightManager {
    constructor(
        private readonly _rome: Rome,
    ) {
    }

    public fightWithRome(tribe: Tribe): boolean {
        return this.fightWithAnotherTribe(tribe, this._rome)
    }

    public fightWithAnotherTribe(currentTribe: Tribe, defender: CanFight): boolean {
        const battleResult = this.compareCombatReadiness(currentTribe, defender)
        if (battleResult > 0) {
            return true
        }
        if (battleResult === 0) {
            return false
        }
        if (battleResult < 0) {
            currentTribe.population.takeLosses(-battleResult)
        }
        return false
    }

    private compareCombatReadiness(currentTribe: Tribe, defender: CanFight): number {
        return currentTribe.population.combatReadiness - defender.population.combatReadiness
    }
}
export default FightManager
