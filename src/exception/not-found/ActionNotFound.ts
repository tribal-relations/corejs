import NotFoundException from './NotFoundException'

class ActionNotFound extends NotFoundException {
    constructor(actionName: string) {
        super('Action ', actionName)
    }
}

export default ActionNotFound
