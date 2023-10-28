import Tile from './tile'

class Territory {
    constructor(
        private food: number,
        private tradingAbility: number,
        private production: number,
        private culture: number,
        private tiles: Array<Tile>,
    ) {
    }

    static createStarterTerritory(): Territory {
        const territory = new Territory(0, 0, 0, 0, Tile.createStarterTiles())
        territory.updateResources()

        return territory
    }

    getTotalFood(): number {
        let accumulator = 0
        for (let i = 0; i < this.tiles.length; i++) {
            accumulator += this.tiles[i].resource.food
        }
        return accumulator
    }

    getTotalTradingAbility(): number {
        let accumulator = 0
        for (let i = 0; i < this.tiles.length; i++) {
            accumulator += this.tiles[i].resource.tradingAbility
        }
        return accumulator
    }

    getTotalProduction(): number {
        let accumulator = 0
        for (let i = 0; i < this.tiles.length; i++) {
            accumulator += this.tiles[i].resource.production
        }
        return accumulator
    }

    getTotalCulture(): number {
        let accumulator = 0
        for (let i = 0; i < this.tiles.length; i++) {
            accumulator += this.tiles[i].resource.culture
        }
        return accumulator
    }

    addTile(newTile: Tile) {
        this.tiles.push(newTile)
    }

    updateResources() {
        this.food = this.getTotalFood()
        this.tradingAbility = this.getTotalTradingAbility()
        this.production = this.getTotalProduction()
        this.culture = this.getTotalCulture()
    }
}


export default Territory