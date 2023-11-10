import type Tile from './Tile'

/**
 * @deprecated need to move to tribe
 */
class Territory {
    constructor(
        private readonly _food: number = 0,
        private readonly _tradingAbility: number = 0,
        private readonly _production: number = 0,
        private readonly _culture: number = 0,
        private readonly _tiles: Tile[] = [],
    ) {
    }
}

export default Territory
