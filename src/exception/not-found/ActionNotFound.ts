import NotFoundException from './NotFoundException.ts'

class ActionNotFound extends NotFoundException {
    constructor(actionName: string) {
        super('Action ', actionName)
    }
}

export default ActionNotFound
