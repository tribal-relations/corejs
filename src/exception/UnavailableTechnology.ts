import AppException from './AppException'
import type TechnologyName from '../domain/enum/TechnologyName'
import type TribeName from '../domain/enum/TribeName'

class UnavailableTechnology extends AppException {
    constructor(tribeName: TribeName, techName: TechnologyName) {
        super(`Tribe ${tribeName} cannot research ${techName}, because not all prerequisites are met.`)
    }
}

export default UnavailableTechnology
