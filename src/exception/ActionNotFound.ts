class ActionNotFound extends Error {
    constructor(actionName: string) {
        super(`Action with name ${actionName} not found.`)
    }
}

export default ActionNotFound
