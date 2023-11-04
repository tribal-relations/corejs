import { singleton } from 'tsyringe'
import EndGameManager from '../app/EndGameManager'
import StartGameManager from '../app/StartGameManager'
import type Game from '../domain/entity/Game'
import ConsoleUi from '../ui/ConsoleUi'

@singleton()
class ConsoleGameProcess {
    _game: Game | undefined

    constructor(
        private readonly _startGameManager: StartGameManager,
        private readonly _playerInterface: ConsoleUi,
        private readonly _endGameManager: EndGameManager,
    ) {
    }

    get game(): Game {
        if (this._game === undefined) {
            throw new Error('game is not yet created')
        }
        return this._game
    }

    set game(game: Game) {
        this._game = game
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

    start(names: string[], name: string = ''): void {
        this.game = this.startGameManager.start(names, name)

        this.playerInterface.game = this.game
        this.playerInterface.startTurns()

        this.endGameManager.game = this.game
        this.endGameManager.initiateFinish()
    }
}

export default ConsoleGameProcess