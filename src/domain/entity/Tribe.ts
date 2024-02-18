import type Bonus from './Bonus.ts'
import type BonusInterface from './BonusInterface.ts'
import Currency from './Currency.ts'
import type Tile from './Tile.ts'
import type TileBonus from './TileBonus.ts'
import type BonusName from '../enum/BonusName.ts'
import type PlaystyleLabel from '../enum/PlaystyleLabel'
import TechnologyName from '../enum/TechnologyName.ts'
import type TribeName from '../enum/TribeName.ts'

class Tribe {
    static readonly defaultPopulation = 2
    static readonly defaultMilitaryPower = 1
    static readonly defaultCivilizedness = 1
    static readonly defaultGold = 10

    constructor(
        private readonly _name: TribeName,
        private readonly _points: number = 0,
        private _gold: number = Tribe.defaultGold,
        private _population: number = Tribe.defaultPopulation,
        private _militaryPower: number = Tribe.defaultMilitaryPower,
        private readonly _civilizedness: number = Tribe.defaultCivilizedness,
        private readonly _technologies: Record<TechnologyName, boolean> = Object(),
        private _tiles: Tile[] = [],
        private readonly _bonuses: Record<BonusName, BonusInterface> = Object(),
        private readonly _tileBonuses: Record<BonusName, TileBonus> = Object(),
        private _bonusesForOneRound: Record<BonusName, Bonus> = Object(),
        private readonly _labels: Record<PlaystyleLabel, boolean> = Object(),
        private _radius: number = 4,
        private _isWinner: boolean = false,
    ) {
    }

    get radius(): number {
        return this._radius
    }

    get bonuses(): Record<BonusName, BonusInterface> {
        return this._bonuses
    }

    get tileBonuses(): Record<BonusName, TileBonus> {
        return this._tileBonuses
    }

    get bonusesForOneRound(): Record<BonusName, Bonus> {
        return this._bonusesForOneRound
    }

    get name(): TribeName {
        return this._name
    }

    get gold(): number {
        return this._gold
    }

    set gold(amount: number) {
        this._gold = amount
    }

    get points(): number {
        let points = 0
        points += this.food
        points += this.production
        points += this.militaryPower
        points += this.culture
        points += this.mercantility
        points += this.civilizedness
        points += Object.values(this.technologies).length

        return points
    }

    get population(): number {
        return this._population
    }

    set population(amount: number) {
        this._population = amount
    }

    get militaryPower(): number {
        let multiplier = 1
        // TODO implement as bonus https://github.com/tribal-relations/client/issues/139
        if (this.hasTech(TechnologyName.Archery)) {
            multiplier *= 2
        }
        if (this.hasTech(TechnologyName.OrganizedArmy)) {
            multiplier *= 3
        }
        if (this.hasTech(TechnologyName.BronzeWeapons)) {
            multiplier *= 2
        }

        return this._militaryPower * multiplier + this.getCurrencyBonus(Currency.MilitaryPower)
    }

    set militaryPower(amount: number) {
        this._militaryPower = amount
    }

    get civilizedness(): number {
        return this._civilizedness
    }

    get food(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].food
        }
        if (this.hasTech(TechnologyName.Calendar)) {
            return accumulator * 2
        }
        return accumulator
    }

    get technologies(): Record<TechnologyName, boolean> {
        return this._technologies
    }

    get isWinner(): boolean {
        return this._isWinner
    }

    set isWinner(_isWinner: boolean) {
        this._isWinner = _isWinner
    }

    get labels(): Record<PlaystyleLabel, boolean> {
        return this._labels
    }

    get tiles(): Tile[] {
        return this._tiles
    }

    /**
     * I need to manually watch out not to overuse this method
     */
    set tiles(tiles: Tile[]) {
        this._tiles = tiles
    }

    get culture(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].culture
        }

        return accumulator + this.getCurrencyBonus(Currency.Culture)
    }

    get production(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].production
        }
        return accumulator + this.getCurrencyBonus(Currency.Production)
    }

    get mercantility(): number {
        let accumulator = 0
        for (let i = 0; i < this._tiles.length; i++) {
            accumulator += this._tiles[i].mercantility
        }
        return accumulator + this.getCurrencyBonus(Currency.Mercantility)
    }

    public getCurrencyBonus(currency: Currency): number {
        const eternalBonus = Object.values(this._bonuses)
            .filter((bonus: Bonus) => bonus.currency === currency)
            .reduce(
                (accumulatedBonus, currentBonus) => accumulatedBonus + currentBonus.amount,
                0,
            )
        const temporaryBonus = Object.values(this._bonusesForOneRound)
            .filter((bonus: Bonus) => bonus.currency === currency)
            .reduce(
                (accumulatedBonus, currentBonus) => accumulatedBonus + currentBonus.amount,
                0,
            )

        return eternalBonus + temporaryBonus
    }

    public hasTech(name: TechnologyName): boolean {
        return (String(name) in this._technologies)
    }

    public addGold(quantity: number): void {
        this._gold += quantity
    }

    public goToNextRadius(): void {
        this._radius--
    }

    public addBonusForOneRound(bonus: Bonus): void {
        this._bonusesForOneRound[bonus.name] = bonus
    }

    public discardTemporaryBonuses(): void {
        this._bonusesForOneRound = Object()
    }

    public addBonus(bonus: BonusInterface): void {
        this._bonuses[bonus.name] = bonus
    }

    public hasBonus(bonus: BonusInterface): boolean {
        return (bonus.name in this._bonuses)
    }

    addTileBonus(tileBonus: TileBonus) {
        this._tileBonuses[tileBonus.name] = tileBonus
    }

    hasLabel(label: PlaystyleLabel): boolean {
        return ((label in this._labels) && this._labels[label])
    }

    addLabel(label: PlaystyleLabel): void {
        this._labels[label] = true
    }
}

export default Tribe
