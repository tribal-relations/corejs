import AppException from './AppException.ts'

class ActionUnsuccessful extends AppException {
    constructor(actionName: string, errorMessage: string | null = null) {
        if (errorMessage) {
            super(`Action '${actionName}' failed. Reason: ${errorMessage}`)
        } else {
            super(`Action '${actionName}' failed.`)
        }
    }
}

export default ActionUnsuccessful
