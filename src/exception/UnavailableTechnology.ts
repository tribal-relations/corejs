import AppException from './AppException.ts'
import type TechnologyName from '../domain/enum/TechnologyName.ts'
import type TribeName from '../domain/enum/TribeName.ts'

class UnavailableTechnology extends AppException {
    constructor(tribeName: TribeName, techName: TechnologyName) {
        super(`Tribe ${tribeName} cannot research ${techName}, because not all prerequisites are met.`)
    }
}

export default UnavailableTechnology
