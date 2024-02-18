import type EntityInterface from '../entity/EntityInterface.ts'

interface EntityRepositoryInterface {
    get: (name: any) => EntityInterface
    getAll: () => Record<string, EntityInterface>
}

export default EntityRepositoryInterface
