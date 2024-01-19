import type CurrentGame from '../app/CurrentGame.ts'
import type EndGameManager from '../app/EndGameManager.ts'
import type StartGameManager from '../app/StartGameManager.ts'
import type ConsoleUi from '../ui/console/ConsoleUi.ts'
import type MainMenu from '../ui/console/io/MainMenu.ts'

class ConsoleGameProcess {
    constructor(
        private readonly _startGameManager: StartGameManager,
        private readonly _playerInterface: ConsoleUi,
        private readonly _endGameManager: EndGameManager,
        private readonly _mainMenu: MainMenu,
        private readonly _currentGame: CurrentGame,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    get startGameManager(): StartGameManager {
        return this._startGameManager
    }

    get playerInterface(): ConsoleUi {
        return this._playerInterface
    }

    get endGameManager(): EndGameManager {
        return this._endGameManager
    }

    start(): void {
        const isStart = this._mainMenu.start()
        if (!isStart) {
            return
        }
        this.playerInterface.startTurns()

        this.endGameManager.initiateFinish()
    }
}

export default ConsoleGameProcess
