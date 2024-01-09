import AppException from '../AppException'

class NotFoundException extends AppException {
    constructor(entityName: string, entityIdentifier: string) {
        if (entityName && entityIdentifier) {
            super(`Not found: ${entityName} "${entityIdentifier}".`)
        }
    }
}

export default NotFoundException
