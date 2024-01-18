import AppException from '../AppException.ts'

class ConsoleException extends AppException {
    constructor(message: string | null = null) {
        if (message) {
            super(message)
        }
    }
}

export default ConsoleException
