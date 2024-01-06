import type ResourceName from '../domain/enum/ResourceName'
import type TribeName from '../domain/enum/TribeName'

class TribeTileNotFound extends Error {
    constructor(tribeName: TribeName, resourceName: ResourceName) {
        super(`Tribe "${tribeName}" does not have tile "${resourceName}"`)
    }
}

export default TribeTileNotFound
