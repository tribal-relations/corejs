import type ActionValidatorInterface from './ActionValidatorInterface.ts'
import type CaravanValidator from './CaravanValidator.ts'
import ActionUnavailable from '../../exception/ActionUnavailable.ts'
import WrongRadius from '../../exception/WrongRadius.ts'
import type GameplayAction from '../entity/action/GameplayAction.ts'
import type PlayerActionInterface from '../entity/action/PlayerActionInterface.ts'
import Currency from '../entity/Currency.ts'
import type Tribe from '../entity/Tribe.ts'
import ActionName from '../enum/ActionName.ts'

class ActionValidator {
     // _actionNameToValidatorMap: { ActionName: ActionValidatorInterface } = Object()
     _actionNameToValidatorMap: Record<ActionName, ActionValidatorInterface> = Object()

    constructor(
        // private readonly _armValidator: ArmValidator,
        // private readonly _researchValidator: ResearchValidator,
        // private readonly _expeditionValidator: ExpeditionValidator,
        // private readonly _goTo3rdRadiusValidator: GoTo3rdRadiusValidator,
        // private readonly _goTo2ndRadiusValidator: GoTo2ndRadiusValidator,
        // private readonly _goTo1stRadiusValidator: GoTo1stRadiusValidator,
        // private readonly _conquerValidator: ConquerValidator,
        // private readonly _cultValidator: CultValidator,
        // private readonly _attackTileValidator: AttackTileValidator,
        // private readonly _attackTribeValidator: AttackTribeValidator,
        // private readonly _prayValidator: PrayValidator,
        // private readonly _allianceValidator: AllianceValidator,
        private readonly _caravanValidator: CaravanValidator,
        // private readonly _removeCaravanValidator: RemoveCaravanValidator,
        // private readonly _pillageCaravanValidator: PillageCaravanValidator,
        // private readonly _hireValidator: HireValidator,
        // private readonly _hireOneRoundValidator: HireOneRoundValidator,
        // private readonly _quitValidator: QuitValidator,

    ) {
        this.buildValidatorsMap()
    }

    public validate(action: PlayerActionInterface, tribe: Tribe): void {
        this.checkActionConstraints(action.gameplayAction, tribe)
        const actionSpecificValidator = this.getValidatorForAction(action, tribe)
        if (actionSpecificValidator) {
            actionSpecificValidator.validate(action)
        }
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

    private getValidatorForAction(action: PlayerActionInterface, _tribe: Tribe): ActionValidatorInterface {
        if (action.gameplayAction.name in this._actionNameToValidatorMap) {
            return this._actionNameToValidatorMap[action.gameplayAction.name]
        }
    }

    private buildValidatorsMap(): void {
        this._actionNameToValidatorMap[ActionName.Caravan] = this._caravanValidator
    }
}

export default ActionValidator
