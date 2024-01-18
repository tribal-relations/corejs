import NotFoundException from './NotFoundException.ts'

class RelationNotFound extends NotFoundException {
    constructor(word: string) {
        super('Relation shorthand', word)
    }
}

export default RelationNotFound
