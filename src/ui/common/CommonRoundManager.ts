import type CurrentGame from '../../app/CurrentGame.ts'
import type TribeManager from '../../app/TribeManager.ts'
import Currency from '../../domain/entity/static/Currency.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import TechnologyName from '../../domain/enum/TechnologyName.ts'
import type DiceThrower from '../../domain/helper/DiceThrower.ts'
import type RelationsStore from '../../domain/store/RelationsStore.ts'

class CommonRoundManager {
    constructor(
        private readonly _relationsManager: RelationsStore,
        private readonly _diceThrower: DiceThrower,
        private readonly _currentGame: CurrentGame,
        private readonly _tribeManager: TribeManager,
    ) {
    }

    public howManyActionsCanTribePerformThisTurn(tribe: Tribe): number {
        const totalActions = Math.max(
            this._relationsManager.getTribeTotalBonus(tribe.name) + 1,
            1,
        )

        const bonusActions = tribe.getCurrencyBonus(Currency.TurnAction)

        return totalActions + bonusActions
    }

    public beforeRound(): void {

    }

    public discardTemporaryBonuses(): void {
        for (const playerName in this._currentGame.players) {
            this._currentGame.players[playerName].tribe.discardTemporaryBonuses()
        }
    }

    public populationGrowth(): void {
        const diceResult = this._diceThrower.d6()
        let diceBonus: number = 0

        for (const playerName in this._currentGame.players) {
            diceBonus = this.getPopulationGrowthDiceBonus(this._currentGame.players[playerName].tribe)
            this._tribeManager.growPopulation(
                this._currentGame.players[playerName].tribe,
                diceResult + diceBonus,
            )
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
