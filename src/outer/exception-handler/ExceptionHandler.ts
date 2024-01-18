import AppException from '../../exception/AppException.ts'
import ConsoleException from '../../exception/console/ConsoleException.ts'
import InternalException from '../../exception/internal/InternalException.ts'
import NotFoundException from '../../exception/not-found/NotFoundException.ts'

class ExceptionHandler {
    handle(error: Error): void {
        // eslint-disable-next-line
        console.error(error)

        if (error instanceof ConsoleException) {
            process.exit(1)
        }
        if (error instanceof InternalException) {
            process.exit(1)
        }
        if (error instanceof NotFoundException) {
            process.exit(1)
        }
        if (error instanceof AppException) {
            process.exit(1)
        }
    }
}

export default ExceptionHandler
