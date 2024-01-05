import type ActionInterface from './ActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import type DiceThrower from '../helper/DiceThrower.ts'

/**
 * @deprecated
 */

class Cult implements ActionInterface {
    actionName = ActionName.Cult

    constructor(
        private readonly _diceThrower: DiceThrower,
    ) {
    }

    public perform(turn: Turn): void {
        const diceResult = this._diceThrower.d6()
        this.performByDiceResult(turn, diceResult)
    }

    private performByDiceResult(turn: Turn, diceResult: number): void {
        if (diceResult === 1) {
            // turn.player.tribe.takeLosses(-5)
            return
        }
        if (diceResult === 2) {
            return
        }
        if (diceResult === 3) {
            // turn.player.tribe.culture += 2

            return
        }
        if (diceResult === 4) {
            // turn.player.tribe.culture += 3

            return
        }
        if (diceResult === 5) {
            // turn.player.tribe.culture += 4

            return
        }
        if (diceResult === 6) {
            // turn.player.tribe.culture += 6

            return
        }
        throw new Error('Unexpected dice result.')
    }
}

export default Cult
