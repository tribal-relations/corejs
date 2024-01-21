import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../entity/action/PlayerActionInterface.ts'
import Bonus from '../entity/Bonus.ts'
import Currency from '../entity/Currency.ts'
import Technology from '../entity/Technology.ts'
import type Tribe from '../entity/Tribe.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import BonusName from '../enum/BonusName.ts'
import type DiceThrower from '../helper/DiceThrower.ts'
import Rand from '../helper/Rand.ts'

class Pray implements ActionInterface {
    actionName = ActionName.Pray

    constructor(
        private readonly _diceThrower: DiceThrower,
    ) {
    }

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        const diceResult = this._diceThrower.d6()
        this.performByDiceResult(turn, diceResult)
    }

    private performByDiceResult(turn: Turn, diceResult: number): void {
        if (diceResult === 1) {
            turn.player.tribe.takeLosses(10)
            return
        }
        if (diceResult === 2) {
            turn.player.tribe.takeLosses(5)

            return
        }
        if (diceResult === 3) {
            return
        }
        if (diceResult === 4) {
            turn.player.tribe.arm()
            return
        }
        if (diceResult === 5) {
            turn.player.tribe.makeTerritorialDiscovery()
            turn.player.tribe.addBonusForOneRound(new Bonus(
                turn.player.tribe,
                BonusName.TurnActionAfterPraying,
                1,
                Currency.TurnAction,
            ))
        }
        if (diceResult === 6) {
            const randomTechnology = this.getRandomAvailableTechnology(turn.player.tribe)
            if (randomTechnology instanceof Technology) {
                turn.player.tribe.research(randomTechnology)
            }
            turn.player.tribe.addBonusForOneRound(new Bonus(
                turn.player.tribe,
                BonusName.TurnActionAfterPraying,
                1,
                Currency.TurnAction,
            ))
        }
    }

    private getRandomAvailableTechnology(tribe: Tribe): Technology | null {
        const availableTechnologies = tribe.getTechnologiesAvailableForResearch()

        if (availableTechnologies.length === 0) {
            return null
        }
        return Rand.choice(availableTechnologies)
    }
}

export default Pray
