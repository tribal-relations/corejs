class InsufficientCliParameters extends Error {
    constructor(expected: number, actual: number) {
        super(`Insufficient parameters. Expected: ${expected}. Actual: ${actual}.`)
    }
}

export default InsufficientCliParameters
