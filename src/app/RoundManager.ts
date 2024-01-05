import type Game from '../domain/entity/Game.ts'
import type Tribe from '../domain/entity/Tribe.ts'
import TechnologyName from '../domain/enum/TechnologyName.ts'
import type DiceThrower from '../domain/helper/DiceThrower.ts'

class RoundManager {
    _game: Game | undefined

    constructor(
        private readonly _diceThrower: DiceThrower,
    ) {
    }

    get game(): Game {
        if (this._game === undefined) {
            throw new Error('game is not yet created')
        }
        return this._game
    }

    set game(game: Game) {
        this._game = game
    }

    public finalizeRound(): void {
        // TODO determine relations between tribes here | how to do it independent from ui?
        this.populationGrowth()
    }

    private populationGrowth(): void {
        const diceResult = this._diceThrower.d6()
        let diceBonus: number = 0
        let currentTribe: Tribe
        for (let i = 0; i < this.game.players.length; ++i) {
            currentTribe = this.game.players[i].tribe
            diceBonus = this.getDiceBonus(currentTribe)
            currentTribe.growPopulation((diceResult + diceBonus))
        }
    }

    private getDiceBonus(tribe: Tribe): number {
        // TODO probably better to move it closer to the center
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

export default RoundManager
