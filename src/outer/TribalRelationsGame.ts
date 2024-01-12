import BrowserGameProcess from './BrowserGameProcess.ts'
import ConsoleGameProcess from './ConsoleGameProcess.ts'
import { container } from '../NaiveDiContainer.ts'

class TribalRelationsGame {
    startBrowser(): void {
        const gameProcess: BrowserGameProcess = container.resolveSafely(BrowserGameProcess)
        gameProcess.start()
    }

    startConsole(): void {
        const gameProcess: ConsoleGameProcess = container.resolveSafely(ConsoleGameProcess)
        gameProcess.start()
    }
}

export default TribalRelationsGame
