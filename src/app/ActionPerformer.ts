import type ActionInterface from './action-performer/ActionInterface.ts'
import type Alliance from './action-performer/Alliance.ts'
import type Arm from './action-performer/Arm.ts'
import type AttackTile from './action-performer/AttackTile.ts'
import type AttackTribe from './action-performer/AttackTribe.ts'
import type Caravan from './action-performer/Caravan.ts'
import type Conquer from './action-performer/Conquer.ts'
import type Cult from './action-performer/Cult.ts'
import type Expedition from './action-performer/Expedition.ts'
import type GoTo1stRadius from './action-performer/GoTo1stRadius.ts'
import type GoTo2ndRadius from './action-performer/GoTo2ndRadius.ts'
import type GoTo3rdRadius from './action-performer/GoTo3rdRadius.ts'
import type Hire from './action-performer/Hire.ts'
import type HireOneRound from './action-performer/HireOneRound.ts'
import type PillageCaravan from './action-performer/PillageCaravan.ts'
import type Pray from './action-performer/Pray.ts'
import type Quit from './action-performer/Quit.ts'
import type RemoveCaravan from './action-performer/RemoveCaravan.ts'
import type Research from './action-performer/Research.ts'
import type GameplayAction from '../domain/entity/action/GameplayAction.ts'
import type PlayerActionInterface from '../domain/entity/action/PlayerActionInterface.ts'
import type Turn from '../domain/entity/Turn.ts'
import ActionName from '../domain/enum/ActionName.ts'
import type ActionValidator from '../domain/validation/ActionValidator.ts'
import ActionUnsuccessful from '../exception/ActionUnsuccessful.ts'

class ActionPerformer {
    _performers: Record<string, ActionInterface> = {}

    constructor(
        private readonly _actionValidator: ActionValidator,
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
        this._actionValidator.validate(playerAction, turn.player.tribe)
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
}

export default ActionPerformer
