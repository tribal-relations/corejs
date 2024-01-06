class ValueNotInEnum extends Error {
    constructor(value: string) {
        super(`The value '${value}' is not in enum.`)
    }
}

export default ValueNotInEnum
