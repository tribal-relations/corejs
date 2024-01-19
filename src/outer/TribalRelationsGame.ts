import ConsoleGameProcess from './ConsoleGameProcess.ts'
import { container } from '../NaiveDiContainer.ts'

class TribalRelationsGame {
    startConsole(): void {
        const gameProcess: ConsoleGameProcess = container.resolveSafely(ConsoleGameProcess)
        gameProcess.start()
    }
}

export default TribalRelationsGame
