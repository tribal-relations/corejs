import ConsoleException from './ConsoleException.ts'

class InvalidInput extends ConsoleException {
    constructor() {
        super('Unexpected input.')
    }
}

export default InvalidInput
