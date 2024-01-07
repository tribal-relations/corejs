import NotFoundException from './NotFoundException'
import type ResourceName from '../../domain/enum/ResourceName'
import type TribeName from '../../domain/enum/TribeName'

class TribeResourceNotFound extends NotFoundException {
    constructor(tribeName: TribeName, resourceName: ResourceName) {
        super(`Tribe "${tribeName}" resource`, resourceName)
    }
}

export default TribeResourceNotFound
