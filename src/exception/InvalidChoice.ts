import AppException from './AppException.ts'

class InvalidChoice extends AppException {
    constructor(message: string | null = null) {
        if (!message) {
            super('Invalid choice.')
            return
        }
        super(message)
    }
}

export default InvalidChoice
