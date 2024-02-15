import BaseRepository from './BaseRepository.ts'
import Resource from '../entity/Resource.ts'
import ResourceName from '../enum/ResourceName.ts'
import Rand from '../helper/Rand.ts'

class ResourceRepository extends BaseRepository<Resource> {
    private static readonly _resources: Record<string, {
        quantity: number
        food: number
        mercantility: number
        production: number
        culture: number
    }> = {
        Metal: {
            quantity: 10,
            food: 0,
            mercantility: 1,
            production: 2,
            culture: 0,
        },
        Fruit: {
            quantity: 8,
            food: 2,
            mercantility: 1,
            production: 0,
            culture: 0,
        },
        Lake: {
            quantity: 4,
            food: 2,
            mercantility: 0,
            production: 0,
            culture: 1,
        },
        Forest: {
            quantity: 20,
            food: 1,
            mercantility: 0,
            production: 2,
            culture: 0,
        },
        River: {
            quantity: 6,
            food: 1,
            mercantility: 2,
            production: 0,
            culture: 1,
        },
        Pasture: {
            quantity: 10,
            food: 3,
            mercantility: 0,
            production: 0,
            culture: 0,
        },
        Stone: {
            quantity: 10,
            food: 0,
            mercantility: 0,
            production: 2,
            culture: 1,
        },
        Gold: {
            quantity: 2,
            food: 0,
            mercantility: 4,
            production: 0,
            culture: 0,
        },
        Silver: {
            quantity: 4,
            food: 0,
            mercantility: 2,
            production: 0,
            culture: 1,
        },
        Desert: {
            quantity: 6,
            food: 0,
            mercantility: 1,
            production: 0,
            culture: 1,
        },
    }

    protected readonly instances: Record<ResourceName, Resource> = {
        [ResourceName.Metal]: ResourceRepository.create(ResourceName.Metal),
        [ResourceName.Fruit]: ResourceRepository.create(ResourceName.Fruit),
        [ResourceName.Lake]: ResourceRepository.create(ResourceName.Lake),
        [ResourceName.Forest]: ResourceRepository.create(ResourceName.Forest),
        [ResourceName.River]: ResourceRepository.create(ResourceName.River),
        [ResourceName.Pasture]: ResourceRepository.create(ResourceName.Pasture),
        [ResourceName.Stone]: ResourceRepository.create(ResourceName.Stone),
        [ResourceName.Gold]: ResourceRepository.create(ResourceName.Gold),
        [ResourceName.Silver]: ResourceRepository.create(ResourceName.Silver),
        [ResourceName.Desert]: ResourceRepository.create(ResourceName.Desert),
    }

    public getRandomResource(): Resource {
        const randomName = Rand.chooseOneFromEnum(ResourceName)

        return this.get(randomName)
    }

    private static create(name: ResourceName): Resource {
        return new Resource(
            name,
            ResourceRepository._resources[name].quantity,
            ResourceRepository._resources[name].food,
            ResourceRepository._resources[name].mercantility,
            ResourceRepository._resources[name].production,
            ResourceRepository._resources[name].culture,
        )
    }
}

export default ResourceRepository
