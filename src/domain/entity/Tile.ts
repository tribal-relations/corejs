import Resource from './Resource'

class Tile {
    static defaultTilesCount = 2

    constructor(
        private readonly _resource: Resource,
    ) {
    }

    public static createFromResourceName(name: string): Tile {
        return new Tile(Resource.createFromName(name))
    }

    public static createStarterTiles(): Tile[] {
        return [
            Tile.createFromResourceName(Resource.pasture),
            Tile.createFromResourceName(Resource.forest),
        ]
    }

    get resource(): Resource {
        return this._resource
    }
}

export default Tile
