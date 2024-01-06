import type TechnologyName from '../domain/enum/TechnologyName'
import type TribeName from '../domain/enum/TribeName'

class AlreadyKnownTechnology extends Error {
    constructor(tribeName: TribeName, techName: TechnologyName) {
        super(`Tribe '${tribeName}' cannot research ${techName}, because it is already known.`)
    }
}

export default AlreadyKnownTechnology
