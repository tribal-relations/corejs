import Population from './Population'
import Territory from './Territory'
import Tile from './Tile'
import TechnologyName from '../enum/TechnologyName'
import type CanFight from '../interface/CanFight'
import ResourceRepository from '../repository/ResourceRepository'
import TechnologyRepository from '../repository/TechnologyRepository'

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

    get food(): number {
        const food = this._territory.food
        if (this.hasTech(TechnologyName.Calendar)) {
            return food * 2
        }
        return food
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

    hasTech(name: TechnologyName): boolean {
        return (String(name) in this._knownTechs)
    }

    public makeTerritorialDiscovery(): void {
        const newTile = Tribe.discoverNewTile()
        this._territory.addTile(newTile)
        this._territory.updateResources()
    }

    public grow(fertility: number): void {
        this.population.grow(this.getPopulationSurplus(fertility))
    }

    public arm(): void {
        if (this.population.total === this.population.combatReadiness) {
            throw new Error('Cannot arm further. Maximal combat readiness for such population.')
        }

        const amount = Math.min(
            this.population.total - this.population.combatReadiness,
            this.territory.production,
        )

        this.population.arm(amount)
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

    public goToNextRadius(): void {
        this._radius--
    }

    public research(techName: TechnologyName): void {
        this.checkTechnologyIsNotBlocked(this, techName)
        this._knownTechs[String(techName)] = true
    }

    private checkTechnologyIsNotBlocked(tribe: Tribe, techName: TechnologyName): void {
        if (techName in tribe.technologies) {
            throw new Error(`${tribe.name} cannot research ${techName}, because it is already known.`)
        }
        const techInstance = TechnologyRepository.createFromName(techName)
        let prerequisiteName: string
        for (prerequisiteName in techInstance.prerequisites) {
            if (!(prerequisiteName in tribe.technologies)) {
                throw new Error(`${tribe.name} cannot research ${techName}, because not all prerequisites are met.`)
            }
        }
    }
}

export default Tribe
