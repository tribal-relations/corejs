import Tile from './Tile'

/**
 * @deprecated need to move to tribe
 */
class Territory {
    constructor(
        private _food: number = 0,
        private _tradingAbility: number = 0,
        private _production: number = 0,
        private _culture: number = 0,
        private readonly _tiles: Tile[] = [],
    ) {
    }

    static createStarterTerritory(): Territory {
        const territory = new Territory(0, 0, 0, 0, Tile.createStarterTiles())
        territory.updateResources()

        return territory
    }

    static rome(): Territory {
        const territory = new Territory(0, 0, 0, 0, Tile.rome())
        territory.updateResources()

        return territory
    }

    get tiles(): Tile[] {
        return this._tiles
    }

    get food(): number {
        return this._food
    }

    get culture(): number {
        return this._culture
    }

    get production(): number {
        return this._production
    }

    get tradingAbility(): number {
        return this._tradingAbility
    }

    getTotalFood(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.food
        }
        return accumulator
    }

    getTotalTradingAbility(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.tradingAbility
        }
        return accumulator
    }

    getTotalProduction(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.production
        }
        return accumulator
    }

    getTotalCulture(): number {
        // TODO need to move it to tribe because techs influence culture and production output
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.culture
        }
        return accumulator
    }

    addTile(newTile: Tile): void {
        this._tiles.push(newTile)
    }

    updateResources(): void {
        this._food = this.getTotalFood()
        this._tradingAbility = this.getTotalTradingAbility()
        this._production = this.getTotalProduction()
        this._culture = this.getTotalCulture()
    }
}

export default Territory
