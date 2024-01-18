import NotFoundException from './NotFoundException.ts'
import type ResourceName from '../../domain/enum/ResourceName.ts'
import type TribeName from '../../domain/enum/TribeName.ts'

class TribeTileNotFound extends NotFoundException {
    constructor(tribeName: TribeName, resourceName: ResourceName) {
        super(`Tribe "${tribeName}" tile`, resourceName)
    }
}

export default TribeTileNotFound
