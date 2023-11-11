import Tile from '../../domain/entity/Tile'
import Tribe from '../../domain/entity/Tribe'
import ResourceName from '../../domain/enum/ResourceName'

class TribeFactory {
    public static createEmpty(options: Record<string, any> = {}): Tribe {
        TribeFactory.checkOptions(options)

        return TribeFactory.create(options)
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
        const food = options.food ?? 4 // TODO remove hardcode
        const production = options.production ?? 2 // TODO remove hardcode
        const culture = options.culture ?? 0
        const tradingAbility = options.tradingAbility ?? 0
        const tiles = options.tiles ?? Tile.createStarterTiles()

        return TribeFactory.create({
            name,
            wealth,
            points,
            techs,
            population,
            food,
            production,
            tiles,
            tradingAbility,
            culture,
            civilizedness,
            combatReadiness,
        })
    }

    public static addFood(tribe: Tribe, amount: number = 1): void {
        const tile = Tile.createFromResourceName(ResourceName.Forest)
        for (let i = 0; i < amount; ++i) {
            tribe.addTile(tile)
        }
        tribe.updateResources()
    }

    public static addCulture(tribe: Tribe, amount: number = 1): void {
        const tile = Tile.createFromResourceName(ResourceName.Lake)
        for (let i = 0; i < amount; ++i) {
            tribe.addTile(tile)
        }
        tribe.updateResources()
    }

    public static addProduction(tribe: Tribe, amount: number = 1): void {
        if (amount % 2 !== 0) {
            throw new Error('There are only tiles with production 2.')
        }
        const tile = Tile.createFromResourceName(ResourceName.Metal)
        for (let i = 0; i < amount / 2; ++i) {
            tribe.addTile(tile)
        }

        tribe.updateResources()
    }

    private static create(options: Record<string, any> = {}): Tribe {
        const name = options.name ?? ''
        const wealth = options.wealth ?? 0
        const points = options.points ?? 0
        const techs = options.technoligies ?? {}
        const population = options.population ?? 0
        const combatReadiness = options.combatReadiness ?? 0
        const civilizedness = options.civilizedness ?? 0
        const food = options.food ?? 0
        const production = options.production ?? 0
        const culture = options.culture ?? 0
        const tradingAbility = options.tradingAbility ?? 0
        const tiles = options.tiles ?? []

        return new Tribe(name, wealth, points, techs, population, combatReadiness, civilizedness, food, tradingAbility, production, culture, tiles)
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
