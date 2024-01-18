import NotFoundException from './NotFoundException.ts'

/**
 * @deprecated
 */
class TribeRecipientRelationNotFound extends NotFoundException {
    constructor(tribeName: string) {
        super('Tribe relation as recipient', tribeName)
    }
}

export default TribeRecipientRelationNotFound
