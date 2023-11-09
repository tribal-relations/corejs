import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import type Turn from '../entity/Turn'
import ActionName from '../enum/ActionName'
import DiceThrower from '../helper/DiceThrower'

/**
 * @deprecated
 */
@singleton()
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
            // turn.player.tribe.population.takeLosses(-5)
            return
        }
        if (diceResult === 2) {
            return
        }
        if (diceResult === 3) {
            // turn.player.tribe.territory.culture += 2

            return
        }
        if (diceResult === 4) {
            // turn.player.tribe.territory.culture += 3

            return
        }
        if (diceResult === 5) {
            // turn.player.tribe.territory.culture += 4

            return
        }
        if (diceResult === 6) {
            // turn.player.tribe.territory.culture += 6

            return
        }
        throw new Error('Unexpected dice result.')
    }
}

export default Cult
