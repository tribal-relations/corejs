import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import Bonus from '../../domain/entity/Bonus.ts'
import Currency from '../../domain/entity/Currency.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import BonusName from '../../domain/enum/BonusName.ts'
import type DiceThrower from '../../domain/helper/DiceThrower.ts'
import type TribeManager from '../TribeManager.ts'

class Cult implements ActionInterface {
    actionName = ActionName.Cult

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
        let bonus = 0
        if (diceResult === 1) {
            this._tribeManager.takeLosses(turn.player.tribe, 5)
            return
        }
        if (diceResult === 2) {
            return
        }
        if (diceResult === 3) {
            bonus = 2
        }
        if (diceResult === 4) {
            bonus = 3
        }
        if (diceResult === 5) {
            bonus = 4
        }
        if (diceResult === 6) {
            bonus = 6
        }
        turn.player.tribe.addBonus(
            new Bonus(
                turn.player.tribe,
                BonusName.CultureFromCultExpansion,
                bonus,
                Currency.Culture,
            ),
        )
    }
}

export default Cult
