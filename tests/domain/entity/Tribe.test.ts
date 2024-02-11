import TribeManager from '../../../src/app/TribeManager.ts'
import type Tile from '../../../src/domain/entity/Tile.ts'
import ResourceName from '../../../src/domain/enum/ResourceName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('can get unique tiles', () => {
    const tribeManager = container.resolveSafely(TribeManager)
    const resourceNames = [
        ResourceName.Forest,
        ResourceName.Forest,

        ResourceName.Pasture,
        ResourceName.Pasture,
        ResourceName.Pasture,

        ResourceName.Fruit,

        ResourceName.Desert,
    ]

    const tribe = TribeFactory.createStarterTribeWithOptions({
        resourceNames,
    })

    const uniqueTiles = tribeManager.getUniqueTiles(tribe)
    expect(tribe.tiles.length).toBe(7)
    expect(uniqueTiles.length).toBe(4)
    expect(uniqueTiles.map((val: Tile) => val.resourceName))
        .toStrictEqual([ResourceName.Forest, ResourceName.Pasture, ResourceName.Fruit, ResourceName.Desert])
})

test('can get unique resource names', () => {
    const resourceNames = [
        ResourceName.Forest,
        ResourceName.Forest,

        ResourceName.Pasture,
        ResourceName.Pasture,
        ResourceName.Pasture,

        ResourceName.Fruit,

        ResourceName.Desert,
    ]
    const tribe = TribeFactory.createStarterTribeWithOptions({
        resourceNames,
    })

    const uniqueResourceNames = this._tribeManager.getUniqueResourceNames(tribe)
    expect(tribe.tiles.length).toBe(7)
    expect(uniqueResourceNames.length).toBe(4)
    expect(uniqueResourceNames).toStrictEqual([
        ResourceName.Forest,
        ResourceName.Pasture,
        ResourceName.Fruit,
        ResourceName.Desert,
    ])
})
