import NotFoundException from './NotFoundException.ts'

class RelationCliShorthandNotFound extends NotFoundException {
    constructor(word: string) {
        super('Relation shorthand', word)
    }
}

export default RelationCliShorthandNotFound
