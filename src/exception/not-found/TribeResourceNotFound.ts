import NotFoundException from './NotFoundException.ts'
import type ResourceName from '../../domain/enum/ResourceName.ts'
import type TribeName from '../../domain/enum/TribeName.ts'

class TribeResourceNotFound extends NotFoundException {
    constructor(tribeName: TribeName, resourceName: ResourceName) {
        super(`Tribe "${tribeName}" resource`, resourceName)
    }
}

export default TribeResourceNotFound
