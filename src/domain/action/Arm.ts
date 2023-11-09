import { singleton } from 'tsyringe'
import type ActionInterface from './ActionInterface'
import type Turn from '../entity/Turn'
import ActionName from '../enum/ActionName'

@singleton()
class Arm implements ActionInterface {
    actionName = ActionName.Arm

    public perform(turn: Turn): void {
        if (turn.player.tribe.population.total === turn.player.tribe.population.combatReadiness) {
            throw new Error('Cannot arm further. Maximal combat readiness for such population.')
        }

        const amount = Math.min(
            turn.player.tribe.population.total - turn.player.tribe.population.combatReadiness,
            turn.player.tribe.territory.production,
        )

        turn.player.tribe.arm(amount)
    }
}

export default Arm
