import Action from '../domain/entity/action'
import { singleton } from 'tsyringe'
import type Turn from '../domain/entity/turn'
import type ActionInterface from './action/action-interface'
import Research from './action/research'
import Arm from './action/arm'
import Expedition from './action/expedition'

@singleton()
class ActionPerformer {
    _performers: Record<string, ActionInterface> = {}

    constructor(
        private readonly _arm: Arm,
        private readonly _research: Research,
        private readonly _expedition: Expedition,
    ) {
        this.buildPerformersMap()
    }

    private buildPerformersMap(): void {
        this._performers = {
            [Action.arm]: this._arm,
            [Action.research]: this._research,
            [Action.expedition]: this._expedition,
        }
    }

    public performAction(action: Action, turn: Turn): boolean {
        const performer = this.getPerformerClass(action)
        if (performer) {
            performer.perform(turn)
            return true
        }

        return false
    }

    private getPerformerClass(action: Action): ActionInterface | undefined {
        return this._performers[action.name]
    }
}

export default ActionPerformer
