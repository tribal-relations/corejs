import type ActionInterface from '../domain/action-performer/ActionInterface.ts'
import type Arm from '../domain/action-performer/Arm.ts'
import type AttackTile from '../domain/action-performer/AttackTile.ts'
import type AttackTribe from '../domain/action-performer/AttackTribe.ts'
import type Conquer from '../domain/action-performer/Conquer.ts'
import type Cult from '../domain/action-performer/Cult.ts'
import type Expedition from '../domain/action-performer/Expedition.ts'
import type GoTo1stRadius from '../domain/action-performer/GoTo1stRadius.ts'
import type GoTo2ndRadius from '../domain/action-performer/GoTo2ndRadius.ts'
import type GoTo3rdRadius from '../domain/action-performer/GoTo3rdRadius.ts'
import type Research from '../domain/action-performer/Research.ts'
import type GameplayAction from '../domain/entity/action/GameplayAction.ts'
import type PlayerActionInterface from '../domain/entity/action/PlayerActionInterface.ts'
import Currency from '../domain/entity/Currency.ts'
import type Tribe from '../domain/entity/Tribe.ts'
import type Turn from '../domain/entity/Turn.ts'
import ActionName from '../domain/enum/ActionName.ts'
import ActionUnavailable from '../exception/ActionUnavailable.ts'
import ActionUnsuccessful from '../exception/ActionUnsuccessful.ts'
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

    public performAction(playerAction: PlayerActionInterface, turn: Turn): void {
        this.checkActionConstraints(playerAction.gameplayAction, turn.player.tribe)
        const performer = this.getPerformerClass(playerAction.gameplayAction)
        if (!performer) {
            throw new ActionUnsuccessful(playerAction.gameplayAction.name)
        }
        performer.perform(playerAction, turn)
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

    private getPerformerClass(action: GameplayAction): ActionInterface | undefined {
        return this._performers[action.name]
    }

    private checkActionConstraints(action: GameplayAction, tribe: Tribe): void {
        if (action.gameAction.constraints.radius < tribe.radius) {
            const error: Error = new WrongRadius(tribe.name, action.gameAction.constraints.radius, action.name)
            throw error
        }
        if (action.gameAction.constraints.culture > tribe.culture) {
            const error: Error = new ActionUnavailable(tribe.name, action.name, Currency.Culture)
            throw error
        }
        if (action.gameAction.constraints.production > tribe.production) {
            const error: Error = new ActionUnavailable(tribe.name, action.name, Currency.Production)
            throw error
        }
        if (action.gameAction.constraints.population > tribe.population) {
            const error: Error = new ActionUnavailable(tribe.name, action.name, Currency.Population)
            throw error
        }
        if (action.gameAction.constraints.gold_cost > tribe.gold) {
            const error: Error = new ActionUnavailable(tribe.name, action.name, Currency.Gold)
            throw error
        }
    }
}

export default ActionPerformer
