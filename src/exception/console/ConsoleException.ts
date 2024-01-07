import AppException from '../AppException'

class ConsoleException extends AppException {
    constructor(message: string | null = null) {
        if (message) {
            super(message)
        }
    }
}

export default ConsoleException
