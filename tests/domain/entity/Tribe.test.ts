import TribeManager from '../../../src/app/TribeManager.ts'
import ResourceName from '../../../src/domain/enum/ResourceName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('can get unique resource names', () => {
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

    const uniqueResourceNames = tribeManager.getUniqueResourceNames(tribe)
    expect(tribe.tilesLength).toBe(7)
    expect(uniqueResourceNames.length).toBe(4)
    expect(uniqueResourceNames).toStrictEqual([
        ResourceName.Forest,
        ResourceName.Pasture,
        ResourceName.Fruit,
        ResourceName.Desert,
    ])
})
