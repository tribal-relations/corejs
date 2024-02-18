interface RepositoryInterface<EntityType> {
    get: (name: EntityType.Name) => EntityType
    getAll: () => Record<EntityType.Name, EntityType>
}

export default RepositoryInterface
