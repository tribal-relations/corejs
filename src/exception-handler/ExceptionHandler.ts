import AppException from '../exception/AppException'
import ConsoleException from '../exception/console/ConsoleException'
import InternalException from '../exception/internal/InternalException'
import NotFoundException from '../exception/not-found/NotFoundException'

class ExceptionHandler {
    handle(error: Error): void {
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
