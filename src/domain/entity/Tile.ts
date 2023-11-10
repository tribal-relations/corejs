import type Resource from './Resource'
import ResourceName from '../enum/ResourceName'
import ResourceRepository from '../repository/ResourceRepository'

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
