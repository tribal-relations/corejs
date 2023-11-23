import type Resource from './Resource.ts'
import ResourceName from '../enum/ResourceName.ts'
import ResourceRepository from '../repository/ResourceRepository.ts'

class Tile {
    static defaultTilesCount = 2

    constructor(
        private readonly _resource: Resource,
    ) {
    }

    public static createFromResourceName(name: ResourceName): Tile {
        return new Tile(ResourceRepository.createFromName(name))
    }

    public static createStarterTiles(): Tile[] {
        return [
            Tile.createFromResourceName(ResourceName.Pasture),
            Tile.createFromResourceName(ResourceName.Forest),
        ]
    }

    static rome(): Tile[] {
        return []
    }

    get resource(): Resource {
        return this._resource
    }
}

export default Tile
