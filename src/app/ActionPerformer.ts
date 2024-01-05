import type ActionInterface from '../domain/action/ActionInterface.ts'
import type Arm from '../domain/action/Arm.ts'
import type Conquer from '../domain/action/Conquer.ts'
import type Cult from '../domain/action/Cult.ts'
import type Expedition from '../domain/action/Expedition.ts'
import type GoTo1stRadius from '../domain/action/GoTo1stRadius.ts'
import type GoTo2ndRadius from '../domain/action/GoTo2ndRadius.ts'
import type GoTo3rdRadius from '../domain/action/GoTo3rdRadius.ts'
import type Research from '../domain/action/Research.ts'
import type Action from '../domain/entity/Action.ts'
import Currency from '../domain/entity/Currency.ts'
import type Tribe from '../domain/entity/Tribe.ts'
import type Turn from '../domain/entity/Turn.ts'
import ActionName from '../domain/enum/ActionName.ts'
import ActionUnavailable from '../exception/ActionUnavailable.ts'
import WrongRadius from '../exception/WrongRadius.ts'

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
        if (action.constraints.culture > tribe.culture) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Culture)
        }
        if (action.constraints.production > tribe.production) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Production)
        }
        if (action.constraints.population > tribe.population) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Population)
        }
        if (action.constraints.gold_cost > tribe.gold) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Gold)
        }
    }
}

export default ActionPerformer
