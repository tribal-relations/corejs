import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName'
import GameplayActionRepository from '../../repository/GameplayActionRepository'
import type Tribe from '../Tribe'

class AttackTribePlayerAction implements PlayerActionInterface {
    gameplayAction = GameplayActionRepository.createFromName(ActionName.AttackTribe)

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
