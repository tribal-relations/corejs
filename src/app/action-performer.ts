import Action from '../domain/entity/Action'
import { singleton } from 'tsyringe'
import type Turn from '../domain/entity/turn'
import type ActionInterface from './action/action-interface'
import Research from './action/research'
import Arm from './action/arm'
import Expedition from './action/expedition'
import type Tribe from '../domain/entity/tribe'
import ActionUnavailable from '../exception/ActionUnavailable'
import WrongRadius from '../exception/WrongRadius'
import Currency from '../domain/entity/Currency'
import GoTo3rdRadius from './action/GoTo3rdRadius'
import GoTo2ndRadius from './action/GoTo2ndRadius'
import GoTo1stRadius from './action/GoTo1stRadius'

@singleton()
class ActionPerformer {
    _performers: Record<string, ActionInterface> = {}

    constructor(
        private readonly _arm: Arm,
        private readonly _research: Research,
        private readonly _expedition: Expedition,
        private readonly _goTo3rdRadius: GoTo3rdRadius,
        private readonly _goTo2ndRadius: GoTo2ndRadius,
        private readonly _goTo1stRadius: GoTo1stRadius,
    ) {
        this.buildPerformersMap()
    }

    private buildPerformersMap(): void {
        this._performers = {
            [Action.arm]: this._arm,
            [Action.research]: this._research,
            [Action.expedition]: this._expedition,
            [Action.goTo3rdRadius]: this._goTo3rdRadius,
            [Action.goTo2ndRadius]: this._goTo2ndRadius,
            [Action.goTo1stRadius]: this._goTo1stRadius,
        }
    }

    public performAction(action: Action, turn: Turn): boolean {
        const performer = this.getPerformerClass(action)
        if (performer) {
            this.checkActionConstraints(action, turn.player.tribe)
            performer.perform(turn)
            return true
        }

        return false
    }

    private getPerformerClass(action: Action): ActionInterface | undefined {
        return this._performers[action.name]
    }

    private checkActionConstraints(action: Action, tribe: Tribe): void {
        if (action.constraints.radius < tribe.radius) {
            throw new WrongRadius(tribe.name, action.constraints.radius, action.name)
        }
        if (action.constraints.culture > tribe.territory.culture) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Culture)
        }
        if (action.constraints.production > tribe.territory.production) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Production)
        }
        if (action.constraints.population > tribe.population.total) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Population)
        }
        if (action.constraints.wealth_cost > tribe.wealth) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Wealth)
        }
    }
}

export default ActionPerformer
