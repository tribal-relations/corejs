class NotInContainer extends Error {
    constructor(className: string) {
        super(`Class ${className} not found in container.`)
    }
}

export default NotInContainer
