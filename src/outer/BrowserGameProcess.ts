import type CurrentGame from '../app/CurrentGame.ts'
import type EndGameManager from '../app/EndGameManager.ts'
import type StartGameManager from '../app/StartGameManager.ts'
import type WebUi from '../ui/web/WebUi.ts'

class BrowserGameProcess {
    constructor(
        private readonly _startGameManager: StartGameManager,
        private readonly _playerInterface: WebUi,
        private readonly _endGameManager: EndGameManager,
        private readonly _currentGame: CurrentGame,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    get startGameManager(): StartGameManager {
        return this._startGameManager
    }

    get playerInterface(): WebUi {
        return this._playerInterface
    }

    get endGameManager(): EndGameManager {
        return this._endGameManager
    }

    start(): void {
    }
}

export default BrowserGameProcess
