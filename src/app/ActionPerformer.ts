import type ActionInterface from '../domain/action-performer/ActionInterface.ts'
import type Arm from '../domain/action-performer/Arm.ts'
import type AttackTile from '../domain/action-performer/AttackTile'
import type AttackTribe from '../domain/action-performer/AttackTribe'
import type Conquer from '../domain/action-performer/Conquer.ts'
import type Cult from '../domain/action-performer/Cult.ts'
import type Expedition from '../domain/action-performer/Expedition.ts'
import type GoTo1stRadius from '../domain/action-performer/GoTo1stRadius.ts'
import type GoTo2ndRadius from '../domain/action-performer/GoTo2ndRadius.ts'
import type GoTo3rdRadius from '../domain/action-performer/GoTo3rdRadius.ts'
import type Research from '../domain/action-performer/Research.ts'
import type PlayerActionInterface from '../domain/entity/action/PlayerActionInterface'
import Currency from '../domain/entity/Currency.ts'
import type GameAction from '../domain/entity/GameAction.ts'
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
        private readonly _attackTile: AttackTile,
        private readonly _attackTribe: AttackTribe,
    ) {
        this.buildPerformersMap()
    }

    public performAction(playerAction: PlayerActionInterface, turn: Turn): boolean {
        this.checkActionConstraints(playerAction.gameAction, turn.player.tribe)
        const performer = this.getPerformerClass(playerAction.gameAction)
        if (performer) {
            performer.perform(playerAction, turn)
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
            [ActionName.AttackTile]: this._attackTile,
            [ActionName.AttackTribe]: this._attackTribe,
        }
    }

    private getPerformerClass(action: GameAction): ActionInterface | undefined {
        return this._performers[action.name]
    }

    private checkActionConstraints(action: GameAction, tribe: Tribe): void {
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
