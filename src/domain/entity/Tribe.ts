import Population from './Population'
import Territory from './Territory'
import Tile from './Tile'
import ResourceRepository from '../../app/repository/ResourceRepository'

class Tribe {
    static tribesCount = 8
    static tribeNameNorth = 'North'
    static tribeNameNortheast = 'Northeast'
    static tribeNameEast = 'East'
    static tribeNameSoutheast = 'Southeast'
    static tribeNameSouth = 'South'
    static tribeNameSouthwest = 'Southwest'
    static tribeNameWest = 'West'
    static tribeNameNorthwest = 'Northwest'
    static tribeNames = [
        'North',
        'Northeast',
        'East',
        'Southeast',
        'South',
        'Southwest',
        'West',
        'Northwest',
    ]

    static tribeNameToAliasMap = {
        North: 'Saami',
        Northeast: 'Chukchi',
        East: 'Chinese',
        Southeast: 'Javanese',
        South: 'Zulu',
        Southwest: 'Lusitanians',
        West: 'Lakota',
        Northwest: 'Aleut',
    }

    private _radius = 4

    constructor(
        private readonly _name: string = '',
        private readonly _wealth: number = 0,
        private readonly _points: number = 0,
        private readonly _population: Population = new Population(),
        private readonly _territory: Territory = new Territory(),
        private readonly _knownTechs: Record<string, boolean> = {},
    ) {
    }

    static discoverNewTile(): Tile {
        return new Tile(ResourceRepository.getRandomResource())
    }

    get radius(): number {
        return this._radius
    }

    get name(): string {
        return this._name
    }

    get wealth(): number {
        return this._wealth
    }

    get points(): number {
        return this._points
    }

    get population(): Population {
        return this._population
    }

    get territory(): Territory {
        return this._territory
    }

    get technologies(): Record<string, boolean> {
        return this._knownTechs
    }

    hasTech(name: string): boolean {
        return (name in this._knownTechs)
    }

    getNewPopulationCount(fertility: number): number {
        const food = this._territory.getTotalFood()
        const cropsYield = food * fertility
        const upperBound = this._population.total * 10

        if (cropsYield < upperBound) {
            return cropsYield
        }

        return upperBound
    }

    makeTerritorialDiscovery(): void {
        const newTile = Tribe.discoverNewTile()
        this._territory.addTile(newTile)
        this._territory.updateResources()
    }

    arm(): void {
        this.population.arm()
    }

    research(name: string): void {
        this._knownTechs[name] = true
    }

    goToNextRadius(): void {
        this._radius--
    }
}

export default Tribe
