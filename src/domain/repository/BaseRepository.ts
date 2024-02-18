import type EntityRepositoryInterface from './EntityRepositoryInterface'
import NotFoundInRepositoryException from '../../exception/not-found/NotFoundInRepositoryException.ts'

class BaseRepository<EntityType> implements EntityRepositoryInterface {
    public readonly instances = {

    }

    public get(name: EntityType.Name): EntityType {
        if (name in this.instances) {
            return this.instances[name]
        }
        throw new NotFoundInRepositoryException(`${this.constructor.name}`, `${name}`)
    }

    public getAll(): Record<EntityType.Name, EntityType> {
        return this.instances
    }
}

export default BaseRepository
