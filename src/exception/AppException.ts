class AppException extends Error {
    constructor(message: string | null = null) {
        if (message) {
            super(message)
        }
    }
}

export default AppException
