import ExceptionHandler from './exception-handler/ExceptionHandler'
import { container } from './NaiveDiContainer.ts'
import TribalRelationsGame from './outer/TribalRelationsGame.ts'

let exceptionHandler: ExceptionHandler
try {
     exceptionHandler = container.resolveSafely(ExceptionHandler)
} catch (error) {
    console.error(error)
    process.exit(1)
}

try {
    const trGame: TribalRelationsGame = container.resolveSafely(TribalRelationsGame)
    trGame.startConsole()
} catch (error) {
    exceptionHandler.handle(error)
}
