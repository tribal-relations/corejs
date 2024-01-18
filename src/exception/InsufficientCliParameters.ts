import AppException from './AppException.ts'

class InsufficientCliParameters extends AppException {
    constructor(expected: number, actual: number) {
        super(`Insufficient parameters. Expected: ${expected}. Actual: ${actual}.`)
    }
}

export default InsufficientCliParameters
