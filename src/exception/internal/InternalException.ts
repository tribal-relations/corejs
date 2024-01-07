import AppException from '../AppException'

class InternalException extends AppException {
    constructor(message: string | null = null) {
        if (message) {
            super(`[Internal] ${message}`)
        }
    }
}

export default InternalException
