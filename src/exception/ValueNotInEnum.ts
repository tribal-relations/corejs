import AppException from './AppException'

class ValueNotInEnum extends AppException {
    constructor(value: string) {
        super(`The value '${value}' is not in enum.`)
    }
}

export default ValueNotInEnum
