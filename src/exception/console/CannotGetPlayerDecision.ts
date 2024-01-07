import AppException from '../AppException'

class CannotGetPlayerDecision extends AppException {
    constructor() {
        super('Could not get player decision.')
    }
}

export default CannotGetPlayerDecision
