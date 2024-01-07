import AppException from '../AppException'

class CannotGetTribeRelationsFromCli extends AppException {
    constructor() {
        super('Could not get tribe relations.')
    }
}

export default CannotGetTribeRelationsFromCli
