import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName.ts'
import type Technology from '../Technology.ts'
import type Tribe from '../Tribe.ts'

class ResearchPlayerAction implements PlayerActionInterface {
    gameplayActionName = ActionName.Research

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
