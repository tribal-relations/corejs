import InternalException from './InternalException.ts'

class NotInContainer extends InternalException {
    constructor(className: string) {
        super(`Class ${className} not found in container.`)
    }
}

export default NotInContainer
