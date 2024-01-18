import AppException from '../AppException.ts'

class CannotGetPlayerDecision extends AppException {
    constructor() {
        super('Could not get player decision.')
    }
}

export default CannotGetPlayerDecision
