import AppException from '../AppException.ts'

class NotFoundInRepositoryException extends AppException {
    constructor(repositoryName: string, entityIdentifier: string) {
        if (repositoryName && entityIdentifier) {
            super(`Not found: "${entityIdentifier}" in repository "${repositoryName}".`)
            return
        }
        if (entityIdentifier) {
            super(`Not found entity with identifier: "${entityIdentifier}".`)
            return
        }
        super('Not found.')
    }
}

export default NotFoundInRepositoryException
