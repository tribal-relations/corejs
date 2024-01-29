import Tile from '../../../src/domain/entity/Tile.ts'
import ResourceName from '../../../src/domain/enum/ResourceName.ts'
import ResourceRepository from '../../../src/domain/repository/ResourceRepository.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('can get unique tiles', () => {
    const forest = new Tile(ResourceRepository.get(ResourceName.Forest))
    const pasture = new Tile(ResourceRepository.get(ResourceName.Pasture))
    const fruit = new Tile(ResourceRepository.get(ResourceName.Fruit))
    const desert = new Tile(ResourceRepository.get(ResourceName.Desert))

    const tiles = [
        forest,
        new Tile(ResourceRepository.get(ResourceName.Forest)),

        pasture,
        new Tile(ResourceRepository.get(ResourceName.Pasture)),
        new Tile(ResourceRepository.get(ResourceName.Pasture)),

        fruit,

        desert,
    ]
    const tribe = TribeFactory.createStarterTribeWithOptions({
        tiles,
    })

    const uniqueTiles = tribe.getUniqueTiles()
    expect(tribe.tiles.length).toBe(7)
    expect(uniqueTiles.length).toBe(4)
    expect(uniqueTiles).toStrictEqual([forest, pasture, fruit, desert])
})

test('can get unique resource names', () => {
    const forest = new Tile(ResourceRepository.get(ResourceName.Forest))
    const pasture = new Tile(ResourceRepository.get(ResourceName.Pasture))
    const fruit = new Tile(ResourceRepository.get(ResourceName.Fruit))
    const desert = new Tile(ResourceRepository.get(ResourceName.Desert))

    const tiles = [
        forest,
        new Tile(ResourceRepository.get(ResourceName.Forest)),

        pasture,
        new Tile(ResourceRepository.get(ResourceName.Pasture)),
        new Tile(ResourceRepository.get(ResourceName.Pasture)),

        fruit,

        desert,
    ]
    const tribe = TribeFactory.createStarterTribeWithOptions({
        tiles,
    })

    const uniqueResourceNames = tribe.getUniqueResourceNames()
    expect(tribe.tiles.length).toBe(7)
    expect(uniqueResourceNames.length).toBe(4)
    expect(uniqueResourceNames).toStrictEqual([
        ResourceName.Forest,
        ResourceName.Pasture,
        ResourceName.Fruit,
        ResourceName.Desert,
    ])
})
