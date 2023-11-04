import Population from './Population'
import Territory from './Territory'
import Tile from './Tile'
import ResourceRepository from '../../app/repository/ResourceRepository'
import type CanFight from '../interface/CanFight'

class Tribe implements CanFight {
    private _radius = 4
    private _isWinner = false

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

    get isWinner(): boolean {
        return this._isWinner
    }

    set isWinner(_isWinner: boolean) {
        this._isWinner = _isWinner
    }

    hasTech(name: string): boolean {
        return (name in this._knownTechs)
    }

    public makeTerritorialDiscovery(): void {
        const newTile = Tribe.discoverNewTile()
        this._territory.addTile(newTile)
        this._territory.updateResources()
    }

    public grow(fertility: number): void {
        this.population.grow(this.getPopulationSurplus(fertility))
    }

    private getPopulationSurplus(fertility: number): number {
        const food = this._territory.getTotalFood()
        const cropsYield = food * fertility
        const upperBound = this._population.total * 10

        if (cropsYield < upperBound) {
            return cropsYield
        }

        return upperBound
    }

    arm(amount: number): void {
        this.population.arm(amount)
    }

    research(name: string): void {
        this._knownTechs[name] = true
    }

    goToNextRadius(): void {
        this._radius--
    }
}

export default Tribe
