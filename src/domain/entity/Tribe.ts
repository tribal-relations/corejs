import Territory from './Territory'
import Tile from './Tile'
import TechnologyName from '../enum/TechnologyName'
import type CanFight from '../interface/CanFight'
import ResourceRepository from '../repository/ResourceRepository'
import TechnologyRepository from '../repository/TechnologyRepository'

class Tribe implements CanFight {
    static readonly defaultTotal = 2
    static readonly defaultCombatReadiness = 1
    static readonly defaultCivilizedness = 1

    private _radius = 4
    private _isWinner = false

    constructor(
        private readonly _name: string = '',
        private readonly _wealth: number = 0,
        private readonly _points: number = 0,
        private readonly _territory: Territory = new Territory(),
        private readonly _knownTechs: Record<string, boolean> = {},

        private _total: number = Tribe.defaultTotal,
        private _combatReadiness: number = Tribe.defaultCombatReadiness,
        private readonly _civilizedness: number = Tribe.defaultCivilizedness,
        private _food: number = 4,
        private _tradingAbility: number = 0,
        private _production: number = 2,
        private _culture: number = 0,
        private readonly _tiles: Tile[] = Tile.createStarterTiles(),
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

    get territory(): Territory {
        return this._territory
    }

    get total(): number {
        return this._total
    }

    get combatReadiness(): number {
        return this._combatReadiness
    }

    get civilizedness(): number {
        return this._civilizedness
    }

    get food(): number {
        const food = this._food
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
        this.addTile(newTile)
        this.updateResources()
    }

    private grow(fertility: number): void {
        // this.population.grow(this.getPopulationSurplus(fertility))
    }

    public growPopulation(fertility: number): void {
        const amount = this.getPopulationSurplus(fertility)
        this._total += amount
    }

    public takeLosses(amount: number): void {
        this.shrink(amount)
        if (amount < this._combatReadiness) {
            this._combatReadiness -= amount
        } else {
            this._combatReadiness = 1
        }
    }

    private shrink(amount: number): void {
        this._total -= amount
        if (this._total < 1) {
            this._total = 1
        }
    }

    public arm(): void {
        if (this.total === this.combatReadiness) {
            throw new Error('Cannot arm further. Maximal combat readiness for such population.')
        }

        const amount = Math.min(
            this.total - this.combatReadiness,
            this.production,
        )

        this._combatReadiness += amount
    }

    private getPopulationSurplus(fertility: number): number {
        const food = this.food
        const cropsYield = food * fertility
        const upperBound = this.total * 10

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

    get tiles(): Tile[] {
        return this._tiles
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

    private getTotalFood(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.food
        }
        return accumulator
    }

    public getTotalTradingAbility(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.tradingAbility
        }
        return accumulator
    }

    public getTotalProduction(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.production
        }
        return accumulator
    }

    public getTotalCulture(): number {
        // TODO need to move it to tribe because techs influence culture and production output
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.culture
        }
        return accumulator
    }

    /**
     * TODO this must be private
     */
    public addTile(newTile: Tile): void {
        this._tiles.push(newTile)
    }

    /**
     * TODO this must be private
     */
    public updateResources(): void {
        this._food = this.getTotalFood()
        this._tradingAbility = this.getTotalTradingAbility()
        this._production = this.getTotalProduction()
        this._culture = this.getTotalCulture()
    }
}

export default Tribe
