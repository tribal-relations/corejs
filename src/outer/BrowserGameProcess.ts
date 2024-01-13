import type EndGameManager from '../app/EndGameManager.ts'
import type StartGameManager from '../app/StartGameManager.ts'
import type Game from '../domain/entity/Game.ts'
import type WebUi from '../ui/web/WebUi.ts'

class BrowserGameProcess {
    _game: Game = this.startGameManager.start()

    constructor(
        private readonly _startGameManager: StartGameManager,
        private readonly _playerInterface: WebUi,
        private readonly _endGameManager: EndGameManager,
    ) {
    }

    get game(): Game {
        return this._game
    }

    set game(game: Game) {
        this._game = game
        this.playerInterface.game = game
        this.endGameManager.game = game
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
