import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName.ts'
import GameplayActionRepository from '../../repository/GameplayActionRepository.ts'
import type Tribe from '../Tribe.ts'

class PillageCaravanPlayerAction implements PlayerActionInterface {
    gameplayAction = GameplayActionRepository.createFromName(ActionName.Pillage)

    constructor(
        private readonly _actor: Tribe,
        private readonly _sender: Tribe,
        private readonly _recipient: Tribe,
    ) {
    }

    get actor(): Tribe {
        return this._actor
    }

    get sender(): Tribe {
        return this._sender
    }

    get recipient(): Tribe {
        return this._recipient
    }
}

export default PillageCaravanPlayerAction
