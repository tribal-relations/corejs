import AppException from '../AppException'

class NotFoundException extends AppException {
    constructor(entityName: string, entityIdentifier: string) {
        if (entityName && entityIdentifier) {
            super(`Not found: ${entityName} "${entityIdentifier}".`)
            return
        }
        if (entityName) {
            super(`${entityName} was not found: .`)
            return
        }
        if (entityIdentifier) {
            super(`Not found entity with identifier: "${entityIdentifier}".`)
            return
        }
        super('Not found.')
    }
}

export default NotFoundException
