import ConsoleException from './ConsoleException.ts'

class InvalidInput extends ConsoleException {
    constructor(message: string | null = null) {
        if (!message) {
            super('Unexpected input.')
            return
        }
        super(message)
    }
}

export default InvalidInput
