import AppException from './AppException.ts'
import type TechnologyName from '../domain/enum/TechnologyName.ts'
import type TribeName from '../domain/enum/TribeName.ts'

class AlreadyKnownTechnology extends AppException {
    constructor(tribeName: TribeName, techName: TechnologyName) {
        super(`Tribe '${tribeName}' cannot research ${techName}, because it is already known.`)
    }
}

export default AlreadyKnownTechnology
