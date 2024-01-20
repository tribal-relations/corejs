import type ActionInterface from '../domain/action-performer/ActionInterface.ts'
import type Alliance from '../domain/action-performer/Alliance.ts'
import type Arm from '../domain/action-performer/Arm.ts'
import type AttackTile from '../domain/action-performer/AttackTile.ts'
import type AttackTribe from '../domain/action-performer/AttackTribe.ts'
import type Caravan from '../domain/action-performer/Caravan.ts'
import type Conquer from '../domain/action-performer/Conquer.ts'
import type Cult from '../domain/action-performer/Cult.ts'
import type Expedition from '../domain/action-performer/Expedition.ts'
import type GoTo1stRadius from '../domain/action-performer/GoTo1stRadius.ts'
import type GoTo2ndRadius from '../domain/action-performer/GoTo2ndRadius.ts'
import type GoTo3rdRadius from '../domain/action-performer/GoTo3rdRadius.ts'
import type Hire from '../domain/action-performer/Hire.ts'
import type HireOneRound from '../domain/action-performer/HireOneRound.ts'
import type PillageCaravan from '../domain/action-performer/PillageCaravan.ts'
import type Pray from '../domain/action-performer/Pray.ts'
import type Quit from '../domain/action-performer/Quit.ts'
import type RemoveCaravan from '../domain/action-performer/RemoveCaravan.ts'
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
        private readonly _pray: Pray,
        private readonly _alliance: Alliance,
        private readonly _caravan: Caravan,
        private readonly _removeCaravan: RemoveCaravan,
        private readonly _pillageCaravan: PillageCaravan,
        private readonly _hire: Hire,
        private readonly _hireOneRound: HireOneRound,
        private readonly _quit: Quit,
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
            [ActionName.AttackTile]: this._attackTile,
            [ActionName.AttackTribe]: this._attackTribe,
            [ActionName.Cult]: this._cult,
            [ActionName.Pray]: this._pray,
            [ActionName.Alliance]: this._alliance,
            [ActionName.Caravan]: this._caravan,
            [ActionName.RemoveCaravan]: this._removeCaravan,
            [ActionName.Pillage]: this._pillageCaravan,
            [ActionName.Hire]: this._hire,
            [ActionName.HireOneRound]: this._hireOneRound,
            [ActionName.Quit]: this._quit,
        }
    }

    private getPerformerClass(action: GameplayAction): ActionInterface | undefined {
        return this._performers[action.name]
    }

    private checkActionConstraints(action: GameplayAction, tribe: Tribe): void {
        if (action.gameAction.constraints.radius < tribe.radius) {
            throw new WrongRadius(tribe.name, action.gameAction.constraints.radius, action.name)
        }
        if (action.gameAction.constraints.culture > tribe.culture) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Culture)
        }
        if (action.gameAction.constraints.production > tribe.production) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Production)
        }
        if (action.gameAction.constraints.population > tribe.population) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Population)
        }
        if (action.gameAction.constraints.gold_cost > tribe.gold) {
            throw new ActionUnavailable(tribe.name, action.name, Currency.Gold)
        }
    }
}

export default ActionPerformer
