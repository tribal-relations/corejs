import AppException from '../AppException.ts'

class InternalException extends AppException {
    constructor(message: string | null = null) {
        if (message) {
            super(`[Internal] ${message}`)
        }
    }
}

export default InternalException
