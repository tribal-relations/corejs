import TileFactory from './TileFactory.ts'
import TribeManager from '../../app/TribeManager.ts'
import type Resource from '../../domain/entity/static/Resource'
import Tile from '../../domain/entity/Tile.ts'
import Tribe from '../../domain/entity/Tribe.ts'
import ResourceName from '../../domain/enum/ResourceName.ts'
import TribeName from '../../domain/enum/TribeName.ts'
import Rand from '../../domain/helper/Rand.ts'
import ResourceRepository from '../../domain/repository/ResourceRepository.ts'
import InvalidFactoryOption from '../../exception/internal/InvalidFactoryOption.ts'
import { container } from '../../NaiveDiContainer.ts'

class TribeFactory {
    public static createStarterTribe(name: string = TribeName.Achaeans): Tribe {
        const gold = 0
        const points = 0
        const techs = {}
        const population = Tribe.defaultPopulation
        const militaryPower = Tribe.defaultMilitaryPower
        const civilizedness = Tribe.defaultCivilizedness

        const tribe = TribeFactory.create({
            name,
            gold,
            points,
            techs,
            population,
            civilizedness,
            militaryPower,
        })
        const tribeManager: TribeManager = container.resolveSafely(TribeManager)
        tribeManager.createStarterTribe(tribe)
        return tribe
    }

    public static createStarterTribeWithOptions(options: Record<string, any> = {}): Tribe {
        const tribeManager: TribeManager = container.resolveSafely(TribeManager)
        TribeFactory.checkOptions(options)

        const name = options.name ?? Rand.chooseOneFromEnum(TribeName)
        const gold = options.gold ?? 0
        const points = options.points ?? 0
        const techs = options.technoligies ?? {}
        const population = options.population ?? Tribe.defaultPopulation
        const militaryPower = options.militaryPower ?? Tribe.defaultMilitaryPower
        const civilizedness = options.civilizedness ?? Tribe.defaultCivilizedness

        const createdTribe = TribeFactory.create({
            name,
            gold,
            points,
            techs,
            population,
            civilizedness,
            militaryPower,
        })
        if (options.resourceNames) {
            const tiles = createdTribe.tiles

            // tribeManager.detachTile(createdTribe, tiles[0])
            // tribeManager.detachTile(createdTribe, tiles[0])// it is reactive , thats why not 1

            const resourceNames = options.resourceNames ?? [ResourceName.Pasture, ResourceName.Forest]
            let tile
            let resource: Resource
            for (let i = 0; i < resourceNames.length; ++i) {
                resource = container.resolveSafely(ResourceRepository).get(resourceNames[i])
                tile = new Tile(
                    createdTribe,
                    resource,
                )
                tribeManager.addTile(createdTribe, tile)
            }
        } else {
            const tribeManager: TribeManager = container.resolveSafely(TribeManager)
            tribeManager.createStarterTribe(createdTribe)
        }
        this.addPoints(options, createdTribe)

        return createdTribe
    }

    public static addFood(tribe: Tribe, amount: number = 1): void {
        const tile = TileFactory.createFromResourceName(ResourceName.Forest, tribe)
        for (let i = 0; i < amount; ++i) {
            tribe.tiles.push(tile)
        }
    }

    public static addCulture(tribe: Tribe, amount: number = 1): void {
        const tile = TileFactory.createFromResourceName(ResourceName.Lake, tribe)
        for (let i = 0; i < amount; ++i) {
            tribe.tiles.push(tile)
        }
    }

    public static addProduction(tribe: Tribe, amount: number = 1): void {
        if (amount % 2 !== 0) {
            throw new Error('There are only tiles with production 2.')
        }
        const tile = TileFactory.createFromResourceName(ResourceName.Metal, tribe)
        for (let i = 0; i < amount / 2; ++i) {
            tribe.tiles.push(tile)
        }
    }

    public static addMercantility(tribe: Tribe, amount: number = 1): void {
        if (amount % 2 !== 0) {
            throw new Error('There are only tiles with mercantility 2.')
        }
        const tile = TileFactory.createFromResourceName(ResourceName.Fruit, tribe)
        for (let i = 0; i < amount / 2; ++i) {
            tribe.tiles.push(tile)
        }
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

    private static create(options: Record<string, any> = {}): Tribe {
        const name = options.name ?? ''
        const gold = options.gold ?? 0
        const points = options.points ?? 0
        const techs = options.technoligies ?? {}
        const population = options.population ?? 0
        const militaryPower = options.militaryPower ?? 0
        const civilizedness = options.civilizedness ?? 0

        return new Tribe(name, points, gold, population, militaryPower, civilizedness, techs)
    }

    private static checkOptions(options: Record<string, any> = {}): void {
        if (options.production && options.resourceNames) {
            throw new InvalidFactoryOption('production', 'tiles')
        }
        if (options.food && options.resourceNames) {
            throw new InvalidFactoryOption('food', 'tiles')
        }
        if (options.culture && options.resourceNames) {
            throw new InvalidFactoryOption('culture', 'tiles')
        }
        if (options.mercantility && options.resourceNames) {
            throw new InvalidFactoryOption('mercantility', 'tiles')
        }
    }
}

export default TribeFactory
