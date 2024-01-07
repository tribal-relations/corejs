import NotFoundException from './NotFoundException'

class RelationNotFound extends NotFoundException {
    constructor(word: string) {
        super('Relation shorthand', word)
    }
}

export default RelationNotFound
