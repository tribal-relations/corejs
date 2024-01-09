import NotFoundException from './NotFoundException'
import type ResourceName from '../../domain/enum/ResourceName'
import type TribeName from '../../domain/enum/TribeName'

class TribeTileNotFound extends NotFoundException {
    constructor(tribeName: TribeName, resourceName: ResourceName) {
        super(`Tribe "${tribeName}" tile`, resourceName)
    }
}

export default TribeTileNotFound
