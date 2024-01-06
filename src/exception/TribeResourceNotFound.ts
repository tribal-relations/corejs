import type ResourceName from '../domain/enum/ResourceName'
import type TribeName from '../domain/enum/TribeName'

class TribeResourceNotFound extends Error {
    constructor(tribeName: TribeName, resourceName: ResourceName) {
        super(`Tribe "${tribeName}" does not have resource "${resourceName}"`)
    }
}

export default TribeResourceNotFound
