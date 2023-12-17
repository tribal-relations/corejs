import type Tribe from './Tribe.ts'

class Player {
    constructor(
        private readonly _tribe: Tribe,
        private readonly _name: string = 'player 0',
    ) {
    }

    get name(): string {
        return this._name
    }

    get tribe(): Tribe {
        return this._tribe
    }
}
export default Player
