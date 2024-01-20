import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../entity/action/PlayerActionInterface.ts'
import Bonus from '../entity/Bonus.ts'
import Currency from '../entity/Currency.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import BonusName from '../enum/BonusName.ts'
import type DiceThrower from '../helper/DiceThrower.ts'

class Cult implements ActionInterface {
    actionName = ActionName.Cult

    constructor(
        private readonly _diceThrower: DiceThrower,
    ) {
    }

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        const diceResult = this._diceThrower.d6()
        this.performByDiceResult(turn, diceResult)
    }

    private performByDiceResult(turn: Turn, diceResult: number): void {
        let bonus = 0
        if (diceResult === 1) {
            turn.player.tribe.takeLosses(5)
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
