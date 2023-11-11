import Tile from '../../domain/entity/Tile'
import Tribe from '../../domain/entity/Tribe'
import ResourceName from '../../domain/enum/ResourceName'

class TribeFactory {
    public static createEmpty(options: Record<string, any> = {}): Tribe {
        TribeFactory.checkOptions(options)
        const createdTribe = TribeFactory.create(options)
        this.addPoints(options, createdTribe)
        return createdTribe
    }

    private static addPoints(options: Record<string, any>, createdTribe: Tribe): void {
        // TODO right now we cannot add X production without adding Y food, because tiles always contain more than one currency
        if (options.food) {
            TribeFactory.addFood(createdTribe, options.food)
        }
        if (options.production) {
            TribeFactory.addProduction(createdTribe, options.production)
        }
        if (options.culture) {
            TribeFactory.addCulture(createdTribe, options.culture)
        }
        if (options.tradingAbility) {
            TribeFactory.addTradingAbility(createdTribe, options.tradingAbility)
        }
    }

    public static createStarterTribeWithOptions(options: Record<string, any> = {}): Tribe {
        TribeFactory.checkOptions(options)

        const name = options.name ?? ''
        const wealth = options.wealth ?? 0
        const points = options.points ?? 0
        const techs = options.technoligies ?? {}
        const population = options.population ?? Tribe.defaultTotal
        const combatReadiness = options.combatReadiness ?? Tribe.defaultCombatReadiness
        const civilizedness = options.civilizedness ?? Tribe.defaultCivilizedness
        const tiles = options.tiles ?? Tile.createStarterTiles()

        const createdTribe = TribeFactory.create({
            name,
            wealth,
            points,
            techs,
            population,
            tiles,
            civilizedness,
            combatReadiness,
        })
        this.addPoints(options, createdTribe)

        return createdTribe
    }

    public static addFood(tribe: Tribe, amount: number = 1): void {
        const tile = Tile.createFromResourceName(ResourceName.Forest)
        for (let i = 0; i < amount; ++i) {
            tribe.addTile(tile)
        }
    }

    public static addCulture(tribe: Tribe, amount: number = 1): void {
        const tile = Tile.createFromResourceName(ResourceName.Lake)
        for (let i = 0; i < amount; ++i) {
            tribe.addTile(tile)
        }
    }

    public static addProduction(tribe: Tribe, amount: number = 1): void {
        if (amount % 2 !== 0) {
            throw new Error('There are only tiles with production 2.')
        }
        const tile = Tile.createFromResourceName(ResourceName.Metal)
        for (let i = 0; i < amount / 2; ++i) {
            tribe.addTile(tile)
        }
    }

    public static addTradingAbility(tribe: Tribe, amount: number = 1): void {
        if (amount % 2 !== 0) {
            throw new Error('There are only tiles with tradingAbility 2.')
        }
        const tile = Tile.createFromResourceName(ResourceName.Fruit)
        for (let i = 0; i < amount / 2; ++i) {
            tribe.addTile(tile)
        }
    }

    private static create(options: Record<string, any> = {}): Tribe {
        const name = options.name ?? ''
        const wealth = options.wealth ?? 0
        const points = options.points ?? 0
        const techs = options.technoligies ?? {}
        const population = options.population ?? 0
        const combatReadiness = options.combatReadiness ?? 0
        const civilizedness = options.civilizedness ?? 0
        const tiles = options.tiles ?? []

        return new Tribe(name, points, wealth, population, combatReadiness, civilizedness, techs, tiles)
    }

    private static checkOptions(options: Record<string, any> = {}): void {
        if (options.production && options.tiles) {
            throw new Error('Use either production or tiles, not both')
        }
        if (options.food && options.tiles) {
            throw new Error('Use either food or tiles, not both')
        }
        if (options.culture && options.tiles) {
            throw new Error('Use either culture or tiles, not both')
        }
        if (options.tradingAbility && options.tiles) {
            throw new Error('Use either tradingAbility or tiles, not both')
        }
    }
}

export default TribeFactory
