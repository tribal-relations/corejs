import Tile from './tile'

class Territory {
    constructor(
        private _food: number,
        private _tradingAbility: number,
        private _production: number,
        private _culture: number,
        private _tiles: Array<Tile>,
    ) {
    }

    static createStarterTerritory(): Territory {
        const territory = new Territory(0, 0, 0, 0, Tile.createStarterTiles())
        territory.updateResources()

        return territory
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
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.culture
        }
        return accumulator
    }

    addTile(newTile: Tile) {
        this._tiles.push(newTile)
    }

    updateResources() {
        this._food = this.getTotalFood()
        this._tradingAbility = this.getTotalTradingAbility()
        this._production = this.getTotalProduction()
        this._culture = this.getTotalCulture()
    }
}


export default Territory