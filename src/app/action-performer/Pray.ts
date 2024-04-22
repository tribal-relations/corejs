import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import Bonus from '../../domain/entity/static/Bonus.ts'
import Currency from '../../domain/entity/static/Currency.ts'
import Technology from '../../domain/entity/static/Technology.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import BonusName from '../../domain/enum/BonusName.ts'
import type DiceThrower from '../../domain/helper/DiceThrower.ts'
import Rand from '../../domain/helper/Rand.ts'
import type TribeManager from '../TribeManager.ts'

class Pray implements ActionInterface {
    actionName = ActionName.Pray

    constructor(
        private readonly _diceThrower: DiceThrower,
        private readonly _tribeManager: TribeManager,

    ) {
    }

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        const diceResult = this._diceThrower.d6()
        this.performByDiceResult(turn, diceResult)
    }

    private performByDiceResult(turn: Turn, diceResult: number): void {
        if (diceResult === 1) {
            this._tribeManager.takeLosses(turn.player.tribe, 10)

            return
        }
        if (diceResult === 2) {
            this._tribeManager.takeLosses(turn.player.tribe, 5)

            return
        }
        if (diceResult === 3) {
            return
        }
        if (diceResult === 4) {
            this._tribeManager.arm(turn.player.tribe)

            return
        }
        if (diceResult === 5) {
            this._tribeManager.makeTerritorialDiscovery(turn.player.tribe)
            turn.player.tribe.addBonusForOneRound(new Bonus(
                BonusName.TurnActionAfterPraying,
                1,
                Currency.TurnAction,
            ))
        }
        if (diceResult === 6) {
            const randomTechnology = this.getRandomAvailableTechnology(turn.player.tribe)
            if (randomTechnology instanceof Technology) {
                this._tribeManager.research(turn.player.tribe, randomTechnology)
            }
            turn.player.tribe.addBonusForOneRound(new Bonus(
                BonusName.TurnActionAfterPraying,
                1,
                Currency.TurnAction,
            ))
        }
    }

    private getRandomAvailableTechnology(tribe: Tribe): Technology | null {
        const availableTechnologies = this._tribeManager.getTechnologiesAvailableForResearch(tribe)

        if (availableTechnologies.length === 0) {
            return null
        }
        return Rand.choice(availableTechnologies)
    }
}

export default Pray
