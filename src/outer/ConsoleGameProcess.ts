import type CurrentGame from '../app/CurrentGame.ts'
import type EndGameManager from '../app/EndGameManager.ts'
import type StartGameManager from '../app/StartGameManager.ts'
import type Player from '../domain/entity/Player.ts'
import type ConsoleUi from '../ui/console/ConsoleUi.ts'
import type MainMenu from '../ui/console/io/MainMenu.ts'
import type Std from '../ui/console/io/Std.ts'
import type TribePrinter from '../ui/console/io/TribePrinter.ts'

class ConsoleGameProcess {
    constructor(
        private readonly _startGameManager: StartGameManager,
        private readonly _playerInterface: ConsoleUi,
        private readonly _endGameManager: EndGameManager,
        private readonly _mainMenu: MainMenu,
        private readonly _currentGame: CurrentGame,
        private readonly _std: Std,
        private readonly _tribePrinter: TribePrinter,
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

        this.outputGameResult()
    }

    private outputGameResult() {
        this._std.outHeading('[GAME OVER]')

        const playerName = this._currentGame.specificGame.winner?.name
        const tribeName = this._currentGame.specificGame.winner?.tribe.name

        this._std.outHeading(`WINNER: ${tribeName} (${playerName})`)
        this._std.out(this._currentGame.specificGame.winningCondition?.text)
        this._std.outHeading('Statistics')
        const stats = this.getStatistics()
        this._std.outTable(stats)
    }

    private getStatistics() {
        return Object.values(this._currentGame.players)
            .map((player: Player) => this._tribePrinter.getStructureForStatistics(player.tribe))
    }
}

export default ConsoleGameProcess
