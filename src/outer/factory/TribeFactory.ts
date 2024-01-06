import Tile from '../../domain/entity/Tile.ts'
import Tribe from '../../domain/entity/Tribe.ts'
import ResourceName from '../../domain/enum/ResourceName.ts'
import InvalidFactoryOption from '../../exception/InvalidFactoryOption'

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
        if (options.mercantility) {
            TribeFactory.addMercantility(createdTribe, options.mercantility)
        }
    }

    public static createStarterTribeWithOptions(options: Record<string, any> = {}): Tribe {
        TribeFactory.checkOptions(options)

        const name = options.name ?? ''
        const gold = options.gold ?? 0
        const points = options.points ?? 0
        const techs = options.technoligies ?? {}
        const population = options.population ?? Tribe.defaultPopulation
        const militaryPower = options.militaryPower ?? Tribe.defaultMilitaryPower
        const civilizedness = options.civilizedness ?? Tribe.defaultCivilizedness
        const tiles = options.tiles ?? Tile.createStarterTiles()

        const createdTribe = TribeFactory.create({
            name,
            gold,
            points,
            techs,
            population,
            tiles,
            civilizedness,
            militaryPower,
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

    public static addMercantility(tribe: Tribe, amount: number = 1): void {
        if (amount % 2 !== 0) {
            throw new Error('There are only tiles with mercantility 2.')
        }
        const tile = Tile.createFromResourceName(ResourceName.Fruit)
        for (let i = 0; i < amount / 2; ++i) {
            tribe.addTile(tile)
        }
    }

    private static create(options: Record<string, any> = {}): Tribe {
        const name = options.name ?? ''
        const gold = options.gold ?? 0
        const points = options.points ?? 0
        const techs = options.technoligies ?? {}
        const population = options.population ?? 0
        const militaryPower = options.militaryPower ?? 0
        const civilizedness = options.civilizedness ?? 0
        const tiles = options.tiles ?? []

        return new Tribe(name, points, gold, population, militaryPower, civilizedness, techs, tiles)
    }

    private static checkOptions(options: Record<string, any> = {}): void {
        if (options.production && options.tiles) {
            throw new InvalidFactoryOption('production', 'tiles')
        }
        if (options.food && options.tiles) {
            throw new InvalidFactoryOption('food', 'tiles')
        }
        if (options.culture && options.tiles) {
            throw new InvalidFactoryOption('culture', 'tiles')
        }
        if (options.mercantility && options.tiles) {
            throw new InvalidFactoryOption('mercantility', 'tiles')
        }
    }
}

export default TribeFactory
