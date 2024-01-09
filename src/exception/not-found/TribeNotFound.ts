import NotFoundException from './NotFoundException'

class TribeNotFound extends NotFoundException {
    constructor(tribeName: string) {
        super('Tribe', tribeName)
    }
}

export default TribeNotFound
