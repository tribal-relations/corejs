import type Technology from './Technology'
import Tile from './Tile.ts'
import AlreadyKnownTechnology from '../../exception/AlreadyKnownTechnology'
import MaximalMilitaryPower from '../../exception/MaximalMilitaryPower'
import TribeResourceNotFound from '../../exception/TribeResourceNotFound'
import TribeTileNotFound from '../../exception/TribeTileNotFound'
import UnavailableTechnology from '../../exception/UnavailableTechnology'
import type ResourceName from '../enum/ResourceName'
import TechnologyName from '../enum/TechnologyName.ts'
import type TribeName from '../enum/TribeName'
import type CanFight from '../interface/CanFight.ts'
import ResourceRepository from '../repository/ResourceRepository.ts'
import TechnologyRepository from '../repository/TechnologyRepository'

class Tribe implements CanFight {
    static readonly defaultPopulation = 2
    static readonly defaultMilitaryPower = 1
    static readonly defaultCivilizedness = 1
    static readonly defaultGold = 10

    private _radius = 4
    private _isWinner = false

    constructor(
        private readonly _name: TribeName,
        private readonly _points: number = 0,
        private readonly _gold: number = Tribe.defaultGold,
        private _population: number = Tribe.defaultPopulation,
        private _militaryPower: number = Tribe.defaultMilitaryPower,
        private readonly _civilizedness: number = Tribe.defaultCivilizedness,
        private readonly _knownTechs: Record<string, boolean> = {},
        private readonly _tiles: Tile[] = Tile.createStarterTiles(),
    ) {
    }

    static discoverNewTile(): Tile {
        return new Tile(ResourceRepository.getRandomResource())
    }

    get radius(): number {
        return this._radius
    }

    get name(): TribeName {
        return this._name
    }

    get gold(): number {
        return this._gold
    }

    get points(): number {
        return this._points
    }

    get population(): number {
        return this._population
    }

    get militaryPower(): number {
        let multiplier = 1
        if (this.hasTech(TechnologyName.Archery)) {
            multiplier *= 2
        }
        if (this.hasTech(TechnologyName.OrganizedArmy)) {
            multiplier *= 3
        }
        if (this.hasTech(TechnologyName.BronzeWeapons)) {
            multiplier *= 2
        }

        return this._militaryPower * multiplier
    }

    get civilizedness(): number {
        return this._civilizedness
    }

    get food(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.food
        }
        if (this.hasTech(TechnologyName.Calendar)) {
            return accumulator * 2
        }
        return accumulator
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
    }

    public growPopulation(fertility: number): void {
        const amount = this.getPopulationSurplus(fertility)
        this._population += amount
    }

    public takeLosses(amount: number): void {
        this.shrink(amount)
        if (amount < this._militaryPower) {
            this._militaryPower -= amount
        } else {
            this._militaryPower = 1
        }
    }

    private shrink(amount: number): void {
        this._population -= amount
        if (this._population < 1) {
            this._population = 1
        }
    }

    public arm(): void {
        if (this.population === this.militaryPower) {
            throw new MaximalMilitaryPower(this.militaryPower, this.population)
        }

        const amount = Math.min(
            this.population - this.militaryPower,
            this.production,
        )

        this._militaryPower += amount
    }

    private getPopulationSurplus(fertility: number): number {
        const food = this.food
        const cropsYield = food * fertility
        const upperBound = this.population * 10

        if (cropsYield < upperBound) {
            return cropsYield
        }

        return upperBound
    }

    public goToNextRadius(): void {
        this._radius--
    }

    public researchByName(techName: TechnologyName): void {
        this.research(TechnologyRepository.createFromName(techName))
    }

    public research(tech: Technology): void {
        this.checkTechnologyIsNotBlocked(this, tech)
        this._knownTechs[String(tech.name)] = true
    }

    private checkTechnologyIsNotBlocked(tribe: Tribe, tech: Technology): void {
        if (tech.name in tribe.technologies) {
            throw new AlreadyKnownTechnology(tribe.name, tech.name)
        }
        let prerequisiteName: string
        for (prerequisiteName in tech.prerequisites) {
            if (!(prerequisiteName in tribe.technologies)) {
                throw new UnavailableTechnology(tribe.name, tech.name)
            }
        }
    }

    get tiles(): Tile[] {
        return this._tiles
    }

    get culture(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.culture
        }
        return accumulator
    }

    get production(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.production
        }
        return accumulator
    }

    get mercantility(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].resource.mercantility
        }
        return accumulator
    }

    /**
     * TODO this must be private
     */
    public addTile(newTile: Tile): void {
        this._tiles.push(newTile)
    }

    public getFirstTileWithResource(resourceName: ResourceName): Tile {
        for (const tileInstance: Tile of this.tiles) {
            if (resourceName === tileInstance.resource.name) {
                return tileInstance
            }
        }
        throw new TribeResourceNotFound(this.name, resourceName)
    }

    public detachTile(tile: Tile): void {
        const index = this.tiles.indexOf(tile)
        if (index === -1) {
            throw new TribeTileNotFound(this.name, tile.resource.name)
        }
        if (index > -1) {
            this.tiles.splice(index, 1)
        }
    }

    public attachTile(tile: Tile): void {
        this.addTile(tile)
    }
}

export default Tribe
