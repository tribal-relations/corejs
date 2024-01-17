import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName'
import GameplayActionRepository from '../../repository/GameplayActionRepository'
import type Technology from '../Technology'
import type Tribe from '../Tribe'

class ResearchPlayerAction implements PlayerActionInterface {
    gameplayAction = GameplayActionRepository.createFromName(ActionName.Research)

    constructor(
        private readonly _actor: Tribe,
        private readonly _technology: Technology,
    ) {
    }

    get actor(): Tribe {
        return this._actor
    }

    get technology(): Technology {
        return this._technology
    }
}

export default ResearchPlayerAction
