import Resource from './resource'

class Tile {
    static defaultTilesCount = 2

    constructor(
        private resource: Resource,
    ) {
    }

    public static createStarterTiles(): Array<Tile> {
        return [
            new Tile(Resource.createFromName(Resource.resourceNamePasture)),
            new Tile(Resource.createFromName(Resource.resourceNameForest)),
        ]
    }

    get resource() {
        return this.resource
    }
}

export default Tile
