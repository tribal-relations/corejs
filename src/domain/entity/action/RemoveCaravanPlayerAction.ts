import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName.ts'
import type Tribe from '../Tribe.ts'

class RemoveCaravanPlayerAction implements PlayerActionInterface {
    gameplayActionName = ActionName.RemoveCaravan
    constructor(
        private readonly _actor: Tribe,
        private readonly _recipient: Tribe,
    ) {
    }

    get actor(): Tribe {
        return this._actor
    }

    get recipient(): Tribe {
        return this._recipient
    }
}

export default RemoveCaravanPlayerAction
