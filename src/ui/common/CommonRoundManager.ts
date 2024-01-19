import type CurrentGame from '../../app/CurrentGame.ts'
import type RelationsManager from '../../app/RelationsManager.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import TechnologyName from '../../domain/enum/TechnologyName.ts'
import type DiceThrower from '../../domain/helper/DiceThrower.ts'

class CommonRoundManager {
    constructor(
        private readonly _relationsManager: RelationsManager,
        private readonly _diceThrower: DiceThrower,
        private readonly _currentGame: CurrentGame,
    ) {
    }

    public howManyActionsCanTribePerformThisTurn(tribe: Tribe): number {
        const totalActions = Math.max(
            this._relationsManager.getTribeTotalBonus(tribe.name) + 1,
            1,
        )

        return totalActions
    }

    public populationGrowth(): void {
        const diceResult = this._diceThrower.d6()
        let diceBonus: number = 0

        for (const playerName in this._currentGame.players) {
            diceBonus = this.getPopulationGrowthDiceBonus(this._currentGame.players[playerName].tribe)
            this._currentGame.players[playerName].tribe.growPopulation((diceResult + diceBonus))
        }
    }

    public getPopulationGrowthDiceBonus(tribe: Tribe): number {
        let bonus = 0
        if (tribe.hasTech(TechnologyName.Pottery)) {
            bonus += 2
        }
        if (tribe.hasTech(TechnologyName.Plough) && tribe.hasTech(TechnologyName.AnimalHusbandry)) {
            bonus += 2 + this._diceThrower.d6()
        }
        if (tribe.hasTech(TechnologyName.Plough) && !tribe.hasTech(TechnologyName.AnimalHusbandry)) {
            bonus += 2
        }
        return bonus
    }
}

export default CommonRoundManager
