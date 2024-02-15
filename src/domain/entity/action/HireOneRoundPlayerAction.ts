import type PlayerActionInterface from './PlayerActionInterface.ts'
import ActionName from '../../enum/ActionName.ts'
import type Tribe from '../Tribe.ts'

class HireOneRoundPlayerAction implements PlayerActionInterface {
    gameplayActionName = ActionName.HireOneRound

    constructor(
        private readonly _buyer: Tribe,
        private readonly _seller: Tribe,
        private readonly _troops: number,
        private readonly _price: number,
    ) {
    }

    get actor(): Tribe {
        return this._buyer
    }

    get buyer(): Tribe {
        return this.actor
    }

    get seller(): Tribe {
        return this._seller
    }

    get troops(): number {
        return this._troops
    }

    get price(): number {
        return this._price
    }
}

export default HireOneRoundPlayerAction
