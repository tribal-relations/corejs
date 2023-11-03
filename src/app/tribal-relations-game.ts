import { container, singleton } from 'tsyringe'
import ConsoleGameProcess from './console-game-process'
import BrowserGameProcess from './browser-game-process'

@singleton()
class TribalRelationsGame {
    startBrowser(names: string[], name: string = ''): void {
        const gameProcess = container.resolve(BrowserGameProcess)
        gameProcess.start(names, name)
    }

    startConsole(names: string[], name: string = ''): void {
        const gameProcess = container.resolve(ConsoleGameProcess)
        gameProcess.start(names, name)
    }
}

export default TribalRelationsGame
