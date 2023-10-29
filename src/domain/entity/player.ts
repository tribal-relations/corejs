import type Tribe from './tribe'

class Player {
    constructor(
        private readonly _tribe: Tribe,
        private readonly _name: string,
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
