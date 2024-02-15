import Tile from '../../domain/entity/Tile.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import type ResourceName from '../../domain/enum/ResourceName.ts'
import ResourceRepository from '../../domain/repository/ResourceRepository.ts'
import { container } from '../../NaiveDiContainer.ts'

class TileFactory {
    public static createFromResourceName(name: ResourceName, tribe: Tribe): Tile {
        return new Tile(tribe, container.resolveSafely(ResourceRepository).get(name))
    }
}

export default TileFactory
