import AppException from './AppException.ts'

class ValueNotInEnum extends AppException {
    constructor(value: string) {
        super(`The value '${value}' is not in enum.`)
    }
}

export default ValueNotInEnum
