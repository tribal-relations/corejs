import ConsoleException from './ConsoleException'

class InvalidInput extends ConsoleException {
    constructor() {
        super('Unexpected input.')
    }
}

export default InvalidInput
