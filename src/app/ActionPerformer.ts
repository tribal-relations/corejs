import { singleton } from 'tsyringe'
import type ActionInterface from '../domain/action/ActionInterface'
import Arm from '../domain/action/Arm'
import Conquer from '../domain/action/Conquer'
import Cult from '../domain/action/Cult'
import Expedition from '../domain/action/Expedition'
import GoTo1stRadius from '../domain/action/GoTo1stRadius'
import GoTo2ndRadius from '../domain/action/GoTo2ndRadius'
import GoTo3rdRadius from '../domain/action/GoTo3rdRadius'
import Research from '../domain/action/Research'
import type Action from '../domain/entity/Action'
import Currency from '../domain/entity/Currency'
import type Tribe from '../domain/entity/Tribe'
import type Turn from '../domain/entity/Turn'
import ActionName from '../domain/enum/ActionName'
import ActionUnavailable from '../exception/ActionUnavailable'
import WrongRadius from '../exception/WrongRadius'

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
        private readonly _conquer: Conquer,
        private readonly _cult: Cult,
    ) {
        this.buildPerformersMap()
    }

    public performAction(action: Action, turn: Turn): boolean {
        this.checkActionConstraints(action, turn.player.tribe)
        const performer = this.getPerformerClass(action)
        if (performer) {
            performer.perform(turn)
            return true
        }

        return false
    }

    private buildPerformersMap(): void {
        this._performers = {
            [ActionName.Arm]: this._arm,
            [ActionName.Research]: this._research,
            [ActionName.Expedition]: this._expedition,
            [ActionName.GoTo3rdRadius]: this._goTo3rdRadius,
            [ActionName.GoTo2ndRadius]: this._goTo2ndRadius,
            [ActionName.GoTo1stRadius]: this._goTo1stRadius,
            [ActionName.Conquer]: this._conquer,
            [ActionName.Cult]: this._cult,
        }
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
