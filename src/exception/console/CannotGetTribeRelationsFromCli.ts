import AppException from '../AppException.ts'

class CannotGetTribeRelationsFromCli extends AppException {
    constructor() {
        super('Could not get tribe relations.')
    }
}

export default CannotGetTribeRelationsFromCli
