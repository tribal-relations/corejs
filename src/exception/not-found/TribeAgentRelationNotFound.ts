import NotFoundException from './NotFoundException'

/**
 * @deprecated
 */
class TribeAgentRelationNotFound extends NotFoundException {
    constructor(tribeName: string) {
        super('Tribe relation as agent', tribeName)
    }
}

export default TribeAgentRelationNotFound
