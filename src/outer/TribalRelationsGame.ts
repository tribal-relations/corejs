import { container, singleton } from 'tsyringe'
import BrowserGameProcess from './BrowserGameProcess'
import ConsoleGameProcess from './ConsoleGameProcess'

@singleton()
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
