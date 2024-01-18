import NotFoundException from './NotFoundException.ts'

class TribeNotFound extends NotFoundException {
    constructor(tribeName: string) {
        super('Tribe', tribeName)
    }
}

export default TribeNotFound
