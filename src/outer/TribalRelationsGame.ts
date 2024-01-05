import { container } from '../NaiveDiContainer.ts'
import BrowserGameProcess from './BrowserGameProcess.ts'
import ConsoleGameProcess from './ConsoleGameProcess.ts'


class TribalRelationsGame {
    startBrowser(): void {
        const gameProcess = container.resolve(BrowserGameProcess)
        gameProcess.start()
    }

    startConsole(): void {
        const gameProcess = container.resolve(ConsoleGameProcess)
        gameProcess.start()
    }
}

export default TribalRelationsGame
