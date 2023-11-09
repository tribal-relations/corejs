class ActionUnsuccessful extends Error {
    constructor(actionName: string, errorMessage: string | null = null) {
        if (errorMessage) {
            super(`Action '${actionName}' failed. Reason: ${errorMessage}`)
        } else {
            super(`Action '${actionName}' failed.`)
        }
    }
}

export default ActionUnsuccessful
