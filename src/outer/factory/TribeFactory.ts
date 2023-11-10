import Territory from '../../domain/entity/Territory'
import Tile from '../../domain/entity/Tile'
import Tribe from '../../domain/entity/Tribe'

class TribeFactory {
    public static create(options: Record<string, any> = {}): Tribe {
        const name = options.name ?? ''
        const wealth = options.wealth ?? 0
        const points = options.points ?? 0
        const territory = options.territory ?? new Territory()
        const techs = options.technoligies ?? {}
        const population = options.population ?? 0
        const combatReadiness = options.combatReadiness ?? 0
        const civilizedness = options.civilizedness ?? 0
        const food = options.food ?? 0
        const production = options.production ?? 0
        const culture = options.culture ?? 0
        const tradingAbility = options.tradingAbility ?? 0
        const tiles = options.tiles ?? []

        return new Tribe(name, wealth, points, territory, techs, population, combatReadiness, civilizedness, food, tradingAbility, production, culture, tiles)
    }

    public static createStarterTribe(
        name: string = 'test',
        territory: Territory | null = null,
    ): Tribe {
        return TribeFactory.create({
            name,
            territory: territory ?? new Territory(),
            population: Tribe.defaultTotal,
            combatReadiness: Tribe.defaultCombatReadiness,
            civilizedness: Tribe.defaultCivilizedness,
            food: 4,
            production: 2,
            tiles: Tile.createStarterTiles(),
        })
    }
}

export default TribeFactory
