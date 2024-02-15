import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName.ts'
import type Tribe from '../Tribe.ts'

class AttackTribePlayerAction implements PlayerActionInterface {
    gameplayActionName = ActionName.AttackTribe

    constructor(
        private readonly _actor: Tribe,
        private readonly _defender: Tribe,
    ) {
    }

    get actor(): Tribe {
        return this._actor
    }

    get defender(): Tribe {
        return this._defender
    }
}

export default AttackTribePlayerAction
